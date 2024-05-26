import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TowerService } from './tower.service';

@Module({
  imports: [HttpModule],
  providers: [TowerService],
  exports: [TowerService],
})
export class TowerModule {}
