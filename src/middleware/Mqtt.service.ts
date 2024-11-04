import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import * as process from 'node:process';
import { DeliveryRepository } from '../repository/Delivery.repository';
import { Geolocalization } from '@src/utils/Geolocalization.utils';
import { ITracedRoute } from '@src/model/Delivery.model';
import { Email } from '@src/utils/Email.utils';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: MqttClient;
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly geolocalization: Geolocalization,
    private readonly email: Email,
  ) {}

  onModuleInit() {
    this.connectToMqtt();
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }

  private connectToMqtt() {
    this.client = connect(process.env.MQTT_BROKER_URL, {
      port: parseInt(process.env.MQTT_PORT),
      protocol: 'mqtts',
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToTopic('topico/localizacaoBackend');
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToTopic('topico/localizacao');
    });

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });
  }

  subscribeToTopic(topic: string) {
    this.client.subscribe(topic, (error) => {
      if (error) {
        console.error(`Subscription to ${topic} failed:`, error);
        return;
      }
      console.log(`Subscribed to ${topic}`);
    });

    this.client.on('message', async (topic, message) => {
      const stringMessage = message.toString();
      const parsedStringMessage: ITracedRoute = JSON.parse(stringMessage);
      const expectedRoute =
        await this.deliveryRepository.saveTraced(parsedStringMessage);

      if (
        !(await this.geolocalization.validateRoute(
          parsedStringMessage,
          expectedRoute.expected_route,
        ))
      ) {
        await this.deliveryRepository.changeStatus(
          parsedStringMessage.idObject,
          2,
        );

        await this.email.sendEmailAlert(
          expectedRoute.email,
          'ENTREGA FORA DE ROTA',
          expectedRoute.name,
          expectedRoute.cc,
        );
      } else {
        await this.deliveryRepository.changeStatus(
          parsedStringMessage.idObject,
          1,
        );
      }
    });
  }

  async sendIdMessage(id: string) {
    const topic = `topico/localizacao/${id}`;
    const message = 'true';

    if (this.client && this.client.connected) {
      this.client.publish(topic, message, (error) => {
        if (error) {
          console.error(`Failed to publish message to ${topic}:`, error);
        } else {
          console.log(`Message "${message}" sent to ${topic}`);
        }
      });
    } else {
      console.error('MQTT client not connected');
    }
  }
}
