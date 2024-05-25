import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { DeliveryStatus } from '@prisma/client';

export class ItemPrepInput {
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
export class DeliveryDTO {
  id: number;
  orderId: number;
  deliveryStatus: DeliveryStatus;
  deliveryArrivalDate: Date;
  items: ItemPreparation[];
}
export class ItemPreparation {
  id: number;
  name: string;
  isReady: boolean;
  quantity: number;
}
