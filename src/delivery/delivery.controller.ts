import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ItemDeliveryInput } from './delivery.model';
import { DeliveryService } from './delivery.service';
import { DeliveryStatus } from '@prisma/client';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('/all')
  async getAllDeliveries() {
    return await this.deliveryService.getAllDeliveries();
  }

  @Post('/:orderId')
  async createDelivery(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() items: ItemDeliveryInput[],
  ) {
    console.log(`Controller : ${orderId}`);
    try {
      return await this.deliveryService.createDelivery(orderId, items);
    } catch (error) {
      return error.message;
    }
  }

  @Get('/:deliveryId')
  async getDelivery(@Param('deliveryId', ParseIntPipe) deliveryId: number) {
    try {
      return await this.deliveryService.findDeliveryById(deliveryId);
    } catch (error) {
      return error.message;
    }
  }

  @Post('/:deliveryId/status')
  async setDeliveryStatus(
    @Param('deliveryId', ParseIntPipe) deliveryId: number,
    @Body('status') status: DeliveryStatus,
  ) {
    try {
      return await this.deliveryService.setDeliveryStatus(deliveryId, status);
    } catch (error) {
      return error.message;
    }
  }
}
