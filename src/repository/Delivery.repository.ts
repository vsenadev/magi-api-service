import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/Database.service';
import { IReturnMessage } from '@src/model/ReturnMessage.model';
import { CreateDeliveryDto, ValidateDeliveryDto } from '@src/dto/Delivery.dto';
import { ObjectId } from 'mongodb';
import { IProduct } from '@src/model/Product.model';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';
import { IDelivery, ITracedRoute } from '@src/model/Delivery.model';

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
        INSERT INTO public.product_delivery (product_id, delivery_id, amount, quantity)
        VALUES (
          (SELECT id FROM public.product WHERE name = $1),
          $2,
          (SELECT value FROM public.product WHERE name = $1) * $3,
          $4
        );
      `;

      const insertValues = [
        product.name.toUpperCase(),
        idDelivery.rows[0].id,
        product.quantity,
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

  async findAllDeliveries(id: number): Promise<IDelivery[] | object[]> {
    const query =
      'SELECT d.id, d.route_id, d.name, e.name AS sender, ep.name AS recipient, d.send_date, d.expected_date, ds.name AS status, ls.name AS lock_status, sc.name AS sender_company, rc.name AS recipient_company, (SELECT SUM(amount) FROM public.product_delivery AS a WHERE a.delivery_id = d.id) AS total FROM public.delivery AS d LEFT JOIN public.delivery_status AS ds ON ds.id = d.status_id LEFT JOIN public.lock_status AS ls ON ls.id = d.lock_status LEFT JOIN public.employee AS e ON e.id = d.sender LEFT JOIN public.employee AS ep ON ep.id = d.recipient LEFT JOIN public.company AS sc ON e.company_id = sc.id LEFT JOIN public.company AS rc ON ep.company_id = rc.id WHERE e.company_id = ($1) OR ep.company_id = ($2);';

    const param = [id, id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);
    for (const row of result.rows) {
      const query = await this.db.queryMongo(
        'delivery',
        'findOne',
        { _id: new ObjectId(row['route_id']) },
        { projection: { _id: 0, expected_route: 0, traced_route: 0, pdf: 0 } },
      );

      if (query != null) {
        row['distance'] = query['distance'];
      }
    }
    return result.rows;
  }

  async findOneDelivery(id: number): Promise<IDelivery | object> {
    const query =
      'SELECT dy.name, dy.sender, dy.recipient, dy.send_date, dy.expected_date, dy.products, s.street AS starting_street, s.number as starting_number, s.city AS starting_city, s.state AS starting_state, d.street AS destination_street, d.number AS destination_number, d.city AS destination_city, d.state AS destination_state, dy.route_id, st.name AS status, ls.name AS lock_status FROM public.delivery AS dy LEFT JOIN public.address AS s ON s.id = dy."startingAddress" LEFT JOIN public.address AS d ON d.id = dy.destination LEFT JOIN public.delivery_status AS st ON st.id = dy.status_id LEFT JOIN public.lock_status AS ls ON ls.id = dy.lock_status WHERE dy.id = ($1)';
    const param = [id];
    const result: IDatabaseReturnModel = await this.db.query(query, param);
    const deliveryMongoInfo = await this.db.queryMongo(
      'delivery',
      'findOne',
      { _id: new ObjectId(result.rows[0]['route_id']) },
      { projection: { _id: 0, pdf: 0 } },
    );

    result.rows[0]['distance'] = deliveryMongoInfo['distance'];
    result.rows[0]['expected_route'] = deliveryMongoInfo['expected_route'];
    result.rows[0]['traced_route'] = deliveryMongoInfo['traced_route'];
    result.rows[0]['distance'] = deliveryMongoInfo['distance'];

    return result.rows[0];
  }

  async getOneValidation(id: string): Promise<object> {
    const query =
      'SELECT d.name AS delivery_name, es.name AS sender, er.name AS recipient, a.street, a.city, a.number FROM public.delivery AS d LEFT JOIN public.employee AS es ON d.sender = es.id LEFT JOIN public.employee AS er ON d.recipient = er.id LEFT JOIN public.address AS a ON d.destination = a.id WHERE d.route_id=($1)';
    const param = [id];

    const result: IDatabaseReturnModel = await this.db.query(query, param);
    return result.rows[0];
  }

  async downloadPdf(id: string): Promise<string> {
    return await this.db.queryMongo(
      'delivery',
      'findOne',
      { _id: new ObjectId(id) },
      {
        projection: { _id: 0, expected_route: 0, traced_route: 0, distance: 0 },
      },
    );
  }

  async saveTraced(tracedObject: ITracedRoute): Promise<any> {
    const query =
      'SELECT d.name AS name, d.route_id, es.email AS sender_email, er.email AS recipient_email FROM public.delivery AS d LEFT JOIN public.employee AS es ON es.id = d.sender LEFT JOIN public.employee AS er ON er.id = d.recipient WHERE d.id = ($1)';
    const param = [tracedObject?.idObject];
    const idRoute = await this.db.query(query, param);

    await this.db.queryMongo('delivery', 'updateOne', {
      filter: { _id: new ObjectId(idRoute.rows[0].route_id) },
      update: {
        $push: {
          traced_route: {
            longitude: tracedObject.longitude,
            latitude: tracedObject.latitude,
          },
        },
      },
    });

    const queryMongo = await this.db.queryMongo(
      'delivery',
      'findOne',
      { _id: new ObjectId(idRoute.rows[0].route_id) },
      {
        projection: { traced_route: 0, distance: 0, pdf: 0 },
      },
    );

    queryMongo['email'] = idRoute.rows[0].recipient_email;
    queryMongo['cc'] = idRoute.rows[0].sender_email;
    queryMongo['name'] = idRoute.rows[0].name;

    return queryMongo;
  }

  async changeStatus(id: number, status: number): Promise<any> {
    const query = 'UPDATE public.delivery SET status_id = ($1) WHERE id = ($2)';
    const param = [status, id];

    await this.db.query(query, param);
  }

  async validateDelivery(data: ValidateDeliveryDto): Promise<any> {
    const query =
      'SELECT e.email, e.password, d.id FROM public.delivery AS d LEFT JOIN public.employee AS e ON e.id = d.recipient WHERE d.route_id = ($1)';
    const values = [data.id_route];

    const result = await this.db.query(query, values);

    const querymongo = await this.db.queryMongo(
      'delivery',
      'findOne',
      { _id: new ObjectId(data.id_route) },
      {
        projection: { _id: 0, distance: 0, pdf: 0 },
      },
    );

    result.rows[0]['traced_route'] = querymongo['traced_route'];
    result.rows[0]['expected_route'] = querymongo['expected_route'];

    return result.rows[0];
  }
}
