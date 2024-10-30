import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from '@src/repository/Delivery.repository';
import { CreateDeliveryDto } from '@src/dto/Delivery.dto';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { ValidationException } from '@src/exceptions/Validation.exception';
import { ZodError } from 'zod';
import { Geolocalization } from '@src/utils/Geolocalization.utils';
import { IDelivery, IRoute, IRouteInfo } from '@src/model/Delivery.model';
import { AddressRepository } from '@src/repository/Address.repository';
import { CreateAddressDto } from '@src/dto/Address.dto';
import { Document } from '@src/utils/Document.utils';
import { QrCode } from '@src/utils/QrCode.utils';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DeliveryService {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly geolocalization: Geolocalization,
    private readonly addressRepository: AddressRepository,
    private readonly document: Document,
    private readonly qrCode: QrCode,
  ) {}

  async createDelivery(data: CreateDeliveryDto): Promise<IReturnMessage> {
    try {
      data.send_date = new Date(data.send_date);
      const newDelivery = new CreateDeliveryDto(data);

      const starting: IRoute = await this.geolocalization.getLatitudeLongitude(
        newDelivery.startingStreet,
        newDelivery.startingNeighborhood,
        newDelivery.startingNumber,
      );

      const destination: IRoute =
        await this.geolocalization.getLatitudeLongitude(
          newDelivery.destinationStreet,
          newDelivery.destinationNeighborhood,
          newDelivery.destinationNumber,
        );

      const route: IRouteInfo =
        await this.geolocalization.getRouteBetweenToPoints(
          starting.longitude,
          starting.latitude,
          destination.longitude,
          destination.latitude,
        );

      const newAddressStarting = new CreateAddressDto({
        cep: newDelivery.startingCep,
        city: newDelivery.startingCity,
        number: String(newDelivery.startingNumber),
        state: newDelivery.startingState,
        street: newDelivery.startingStreet,
      });

      const newAddressDestination = new CreateAddressDto({
        cep: newDelivery.destinationCep,
        city: newDelivery.destinationCity,
        number: String(newDelivery.destinationNumber),
        state: newDelivery.destinationState,
        street: newDelivery.destinationStreet,
      });

      newDelivery.expectedRoute = route.coordinates;
      newDelivery.expectedDate = await this.geolocalization.calcuteEndDate(
        newDelivery.send_date,
        route.duration,
      );
      newDelivery.distance = route.distance;
      newDelivery.startingAddress =
        await this.addressRepository.create(newAddressStarting);
      newDelivery.destinationAddress = await this.addressRepository.create(
        newAddressDestination,
      );

      const mapsUrl = await this.geolocalization.createMapsUrl(
        starting,
        destination,
        route.coordinates,
      );

      const routeId = await this.deliveryRepository.createDelivery(newDelivery);

      newDelivery.pdf = await this.document.generatePdf(
        newDelivery.name,
        newDelivery.sender,
        newDelivery.recipient,
        newDelivery.startingStreet,
        newDelivery.startingNumber,
        newDelivery.startingNeighborhood,
        newDelivery.startingCity,
        newDelivery.startingState,
        newDelivery.startingCep,
        newDelivery.destinationStreet,
        newDelivery.destinationNumber,
        newDelivery.destinationNeighborhood,
        newDelivery.destinationCity,
        newDelivery.destinationState,
        newDelivery.destinationCep,
        await this.qrCode.generateQrCode(mapsUrl),
        await this.qrCode.generateQrCode(
          `${process.env.CORS_ORIGIN}/${routeId}`,
        ),
      );

      return await this.deliveryRepository.insertPdf(newDelivery.pdf, routeId);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationException(error);
      } else if (error instanceof ValidationException) {
        return { message: error.message };
      }

      throw error;
    }
  }

  async findAllDeliveries(id: number): Promise<IDelivery[]> {
    try {
      return await this.deliveryRepository.findAllDeliveries(id);
    } catch (error) {
      throw error;
    }
  }
}
