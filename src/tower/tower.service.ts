import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Delivery } from './tower.model';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class TowerService {
  private controlTowerUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.controlTowerUrl = this.configService.get('CONTROL_TOWER_URL');
  }

  getAllPossibleStatuses(): DeliveryStatus[] {
    return Object.values(DeliveryStatus);
  }

  async updateStatus(
    deliveryId: number,
    status: DeliveryStatus,
  ): Promise<Delivery> {
    const response = await firstValueFrom(
      this.httpService
        .put<Delivery>(`${this.controlTowerUrl}/delivery/${deliveryId}`, {
          status,
        })
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new NotFoundException(`Delivery ${deliveryId} not found`);
            }
            throw new InternalServerErrorException("Can't get delivery tower");
          }),
        ),
    );

    return response.data;
  }

  async getStatusById(deliveryId: number): Promise<Delivery> {
    const response = await firstValueFrom(
      this.httpService
        .get<Delivery>(`${this.controlTowerUrl}/delivery/${deliveryId}`)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new NotFoundException(`Delivery ${deliveryId} not found`);
            }
            throw new InternalServerErrorException("Can't get delivery tower");
          }),
        ),
    );

    return response.data;
  }
}
