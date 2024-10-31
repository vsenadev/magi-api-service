import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Client as PgClient } from 'pg';
import { MongoClient, Db } from 'mongodb';
import { IDatabaseReturnModel } from '@src/model/DatabaseReturn.model';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pgClient: PgClient;
  private mongoClient: MongoClient;
  private mongoDb: Db;

  constructor() {
    const sslEnabled = process.env.PG_SSL === 'true';

    this.pgClient = new PgClient({
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      ssl: sslEnabled ? { rejectUnauthorized: false } : false,
    });

    this.mongoClient = new MongoClient(process.env.MONGO_URL);
  }

  async onModuleInit() {
    try {
      await this.pgClient.connect();
      console.log('Conectado ao PostgreSQL');

      await this.mongoClient.connect();
      this.mongoDb = this.mongoClient.db(process.env.MONGO_DATABASE);
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.error('Erro ao conectar aos bancos de dados:', error);
      throw new Error('Não foi possível conectar aos bancos de dados');
    }
  }

  async onModuleDestroy() {
    try {
      await this.pgClient.end();
      console.log('Conexão com o PostgreSQL encerrada');

      await this.mongoClient.close();
      console.log('Conexão com o MongoDB encerrada');
    } catch (error) {
      console.error('Erro ao encerrar conexões com os bancos de dados:', error);
    }
  }

  async query(
    queryText: string,
    values?: any[],
  ): Promise<IDatabaseReturnModel | any> {
    try {
      const result = await this.pgClient.query(queryText, values);
      return result;
    } catch (error) {
      console.error('Erro ao executar query no PostgreSQL:', error);

      if (error.code === '23505') {
        throw new ConflictException(`Chave duplicada: ${error.detail}`);
      }

      throw new InternalServerErrorException(
        'Erro ao executar a query no PostgreSQL',
      );
    }
  }

  async queryMongo(
    collection: string,
    operation: string,
    query: any,
    options?: any,
  ): Promise<any> {
    try {
      const dbCollection = this.mongoDb.collection(collection);

      switch (operation) {
        case 'find':
          return await dbCollection.find(query, options).toArray();
        case 'findOne':
          return await dbCollection.findOne(query, options);
        case 'insertOne':
          return await dbCollection.insertOne(query);
        case 'updateOne':
          return await dbCollection.updateOne(
            query.filter,
            query.update,
            options,
          );
        case 'deleteOne':
          return await dbCollection.deleteOne(query);
        default:
          throw new Error(`Operação MongoDB desconhecida: ${operation}`);
      }
    } catch (error) {
      console.error('Erro ao executar operação no MongoDB:', error);
      throw new InternalServerErrorException(
        'Erro ao executar a operação no MongoDB',
      );
    }
  }
}
