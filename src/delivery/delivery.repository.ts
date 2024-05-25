import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryDTO, ItemPrepInput } from './delivery.model';
import { DeliveryStatus } from '@prisma/client';

export class DeliveryRepository {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}

  async createDelivery(
    orderId: number,
    items: ItemPrepInput[],
  ): Promise<DeliveryDTO> {
    console.log(`Repository create : ${orderId}`);
    const delivery = await this.prismaService.delivery.create({
      data: {
        orderId,
        items: {
          create: items.map((item) => ({
            itemId: item.itemId,
            quantity: item.quantity,
            name: item.name,
            isReady: true,
          })),
        },
        deliveryStatus: 'PENDING',
        deliveryArrivalDate: null,
      },
      include: {
        items: true,
      },
    });
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      deliveryStatus: delivery.deliveryStatus,
      deliveryArrivalDate: delivery.deliveryArrivalDate,
      items: delivery.items,
    };
  }

  async findDeliveryById(deliveryId: number): Promise<DeliveryDTO> {
    const delivery = await this.prismaService.delivery.findUnique({
      where: {
        id: deliveryId,
      },
      include: {
        items: true,
      },
    });
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      deliveryStatus: delivery.deliveryStatus,
      deliveryArrivalDate: delivery.deliveryArrivalDate,
      items: delivery.items,
    };
  }

  async findDeliveryByOrderId(orderId: number): Promise<DeliveryDTO> {
    console.log(`Repository find by orderid : ${orderId}`);

    const delivery = await this.prismaService.delivery.findFirst({
      where: {
        orderId,
      },
      include: {
        items: true,
      },
    });
    return delivery
      ? {
          id: delivery.id,
          orderId: delivery.orderId,
          deliveryStatus: delivery.deliveryStatus,
          deliveryArrivalDate: delivery.deliveryArrivalDate,
          items: delivery.items,
        }
      : null;
  }

  async getAllDeliveries(): Promise<DeliveryDTO[]> {
    const deliveries = await this.prismaService.delivery.findMany({
      include: {
        items: true,
      },
    });
    return deliveries.map((delivery) => ({
      id: delivery.id,
      orderId: delivery.orderId,
      deliveryStatus: delivery.deliveryStatus,
      deliveryArrivalDate: delivery.deliveryArrivalDate,
      items: delivery.items,
    }));
  }

  async setDeliveryStatus(
    id: number,
    status: DeliveryStatus,
  ): Promise<DeliveryDTO> {
    const delivery = await this.prismaService.delivery.update({
      where: {
        id,
      },
      data: {
        deliveryStatus: status,
      },
      include: {
        items: true,
      },
    });
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      deliveryStatus: delivery.deliveryStatus,
      deliveryArrivalDate: delivery.deliveryArrivalDate,
      items: delivery.items,
    };
  }

  async setArrivalDate(id: number, arrivalDate: Date): Promise<DeliveryDTO> {
    const delivery = await this.prismaService.delivery.update({
      where: {
        id,
      },
      data: {
        deliveryArrivalDate: arrivalDate,
      },
      include: {
        items: true,
      },
    });
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      deliveryStatus: delivery.deliveryStatus,
      deliveryArrivalDate: delivery.deliveryArrivalDate,
      items: delivery.items,
    };
  }
}
