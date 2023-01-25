import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
// Get Cosmos Client
import { connect, connection } from 'mongoose';
// Data items
@Injectable()
export class ConnectionService implements OnModuleInit {
  constructor(private _configService: ConfigService) {}
  db = null;
  async onModuleInit() {
    // Provide required connection from environment variables
    const COSMOSDB_USER: string = this._configService.get('COSMOSDB_USER');
    const COSMOSDB_PASSWORD: string =
      this._configService.get('COSMOSDB_PASSWORD');
    const COSMOSDB_HOST: string = this._configService.get('COSMOSDB_HOST');
    const COSMOSDB_PORT: string = this._configService.get('COSMOSDB_PORT');
    const COSMOSDB_DBNAME: string = this._configService.get('COSMOSDB_DBNAME');
    const COSMOSDB_APP_NAME: string =
      this._configService.get('COSMOSDB_APP_NAME');
    const url = `mongodb://${COSMOSDB_USER}:${COSMOSDB_PASSWORD}@${COSMOSDB_HOST}:${COSMOSDB_PORT}/${COSMOSDB_DBNAME}?retrywrites=false`;
    await connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      ssl: true,
      maxIdleTimeMS: 120000,
      appname: COSMOSDB_APP_NAME,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 60000,
    })
      .then(async () => {
        console.log('Connection to CosmosDB successful');
        this.db = connection.db;
      })
      .catch((err) => console.error(err));
  }

  async aggregate(
    collectionName: string,
    aggregation,
    methodName = 'undefined',
  ) {
    return await this.db
      .collection(collectionName)
      .aggregate([{ $addFields: { methodName: methodName } }, ...aggregation])
      .maxTimeMS(40000)
      .toArray();
  }
}
