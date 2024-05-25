import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TowerModule } from '../tower/tower.module';
import { DeliveryController } from './delivery.controller';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [PrismaModule, TowerModule],
  controllers: [DeliveryController],
  providers: [DeliveryRepository, DeliveryService],
})
export class DeliveryModule {}
