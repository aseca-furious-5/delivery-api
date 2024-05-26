import { IsEnum, IsNotEmpty } from 'class-validator';
import { DeliveryStatus } from '@prisma/client';

export class DeliveryStatusUpdate {
  @IsNotEmpty()
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;
}
export class Delivery {
  id: number;
  status: DeliveryStatus;
  orderId: number;
  arrivalDate: Date;
}
