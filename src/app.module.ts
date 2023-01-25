import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { ConnectionModule } from './core/connection/connection.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    ConnectionModule,
    // MongooseModule.forRootAsync({
    //   useFactory: async (_configService: ConfigService) => {
    //     const COSMOSDB_USER: string = _configService.get('COSMOSDB_USER');
    //     const COSMOSDB_PASSWORD: string =
    //       _configService.get('COSMOSDB_PASSWORD');
    //     const COSMOSDB_HOST: string = _configService.get('COSMOSDB_HOST');
    //     const COSMOSDB_PORT: string = _configService.get('COSMOSDB_PORT');

    //     const uri = `mongodb://${COSMOSDB_USER}:${COSMOSDB_PASSWORD}@${COSMOSDB_HOST}:${COSMOSDB_PORT}/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ulzpknscadcos001@`;
    //     console.log(uri);
    //     // 'mongodb://127.0.0.1:8081/admin?ssl=true&replicaSet=globaldb'
    //     //  'mongodb://your-endpoint:your-key@your-endpoint.documents.azure.com:10255/your-database?ssl=true',
    //     //  'mongodb://your-endpoint:service.get('AZURE_COSMOS_DB_PRIMARY_KEY')@your-endpoint.documents.azure.com:10255/your-database?ssl=true',
    //     return {
    //       uri,
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //       useCreateIndex: true,
    //       retryAttempts: 100,
    //       retryDelay: 60000,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
