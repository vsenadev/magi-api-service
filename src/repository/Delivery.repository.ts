import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { CreateDeliveryDto } from '@src/dto/Delivery.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class DeliveryRepository {
  constructor(private readonly db: DatabaseService) {}
  async createDelivery(data: CreateDeliveryDto): Promise<IReturnMessage> {
    const createDeliveryObject = await this.db.queryMongo(
      'delivery',
      'insertOne',
      {
        expected_route: data.expectedRoute,
        traced_route: [],
        distance: data.distance,
        pdf: data.pdf,
      },
    );
    const query =
      'INSERT INTO public.delivery (name, sender, recipient, send_date, expected_date, status_id, lock_status, route_id, "startingAddress", destination, products) VALUES ($1, (SELECT id FROM public.employee WHERE email = $2), (SELECT id FROM public.employee WHERE email = $3), $4, $5, 1, 1, $6, $7, $8, $9) RETURNING id';
    const values = [
      data.name,
      data.sender,
      data.recipient,
      data.send_date,
      data.expectedDate,
      createDeliveryObject.insertedId.toString(),
      parseInt(String(data.startingAddress)),
      parseInt(String(data.destinationAddress)),
      data.products.length,
    ];
    const idDelivery = await this.db.query(query, values);

    for (const product of data.products) {
      const insertQuery = `
        INSERT INTO public.product_delivery (product_id, delivery_id, amount)
        VALUES (
          (SELECT id FROM public.product WHERE name = $1),
          $2,
          (SELECT value FROM public.product WHERE name = $1) * $3
        );
      `;

      const insertValues = [
        product.name.toUpperCase(),
        idDelivery.rows[0].id,
        product.quantity,
      ];

      await this.db.query(insertQuery, insertValues);
    }

    return createDeliveryObject.insertedId.toString();
  }

  async insertPdf(pdf: any, routeId): Promise<IReturnMessage> {
    await this.db.queryMongo('delivery', 'updateOne', {
      filter: { _id: new ObjectId(routeId) },
      update: { $set: { pdf: pdf } },
    });

    return { message: 'Entrega cadastrada com sucesso!' };
  }
}
