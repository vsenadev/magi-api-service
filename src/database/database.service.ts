import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import { IDatabaseReturnModel } from '../model/databaseReturn.model';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor() {
    const sslEnabled = process.env.PG_SSL === 'true';

    this.client = new Client({
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      ssl: sslEnabled ? { rejectUnauthorized: false } : false,
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Connected to PostgreSQL database');
  }

  async onModuleDestroy() {
    await this.client.end();
    console.log('Disconnected from PostgreSQL database');
  }

  async query(
    queryText: string,
    values?: any[],
  ): Promise<IDatabaseReturnModel | any> {
    return this.client.query(queryText, values);
  }
}
