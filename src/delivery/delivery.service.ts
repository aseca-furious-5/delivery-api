import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeliveryDTO, ItemDeliveryInput } from './delivery.model';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly preparationRepository: DeliveryRepository) {}

  async createDelivery(
    orderId: number,
    items: ItemDeliveryInput[],
  ): Promise<DeliveryDTO> {
    console.log(`Service : ${orderId}`);
    if (await this.preparationRepository.findDeliveryByOrderId(orderId)) {
      throw new ConflictException(
        `Delivery for orderId ${orderId} already exists!`,
      );
    }
    return this.preparationRepository.createDelivery(orderId, items);
  }

  async findDeliveryById(deliveryId: number): Promise<DeliveryDTO> {
    const delivery =
      await this.preparationRepository.findDeliveryById(deliveryId);
    if (delivery) {
      return this.preparationRepository.findDeliveryById(deliveryId);
    } else throw new NotFoundException('Delivery not found');
  }

  async getAllDeliveries(): Promise<DeliveryDTO[]> {
    return this.preparationRepository.getAllDeliveries();
  }

  async setDeliveryStatus(
    id: number,
    status: DeliveryStatus,
  ): Promise<DeliveryDTO> {
    let delivery: DeliveryDTO;
    if (status == DeliveryStatus.DELIVERED) {
      await this.preparationRepository.setDeliveryStatus(id, status);
      delivery = await this.preparationRepository.setArrivalDate(
        id,
        new Date(),
      );
      return delivery;
    }
    delivery = await this.preparationRepository.setDeliveryStatus(id, status);
    return delivery;
  }
}
