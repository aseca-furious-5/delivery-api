import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './tower.model';
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

  async updateStatus(orderId: number, status: DeliveryStatus): Promise<Order> {
    const response = await firstValueFrom(
      this.httpService
        .put<Order>(`${this.controlTowerUrl}/order/${orderId}`, {
          status,
        })
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new NotFoundException(`Order ${orderId} not found`);
            }
            throw new InternalServerErrorException("Can't get order tower");
          }),
        ),
    );

    return response.data;
  }

  async getStatusById(orderId: number): Promise<Order> {
    const response = await firstValueFrom(
      this.httpService
        .get<Order>(`${this.controlTowerUrl}/order/${orderId}`)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response?.status === 404) {
              throw new NotFoundException(`Order ${orderId} not found`);
            }
            throw new InternalServerErrorException("Can't get order tower");
          }),
        ),
    );
    return response.data;
  }
}
