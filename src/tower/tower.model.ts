import { DeliveryStatus } from '@prisma/client';

export class Order {
  id: number;
  status: DeliveryStatus;
}
