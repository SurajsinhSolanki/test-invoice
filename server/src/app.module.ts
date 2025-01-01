import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { Invoice } from './modules/invoice/entities/invoice.entity';
import { Item } from './modules/invoice/entities/item.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: 'root',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Invoice,Item],
      synchronize: process.env.ENV !== 'production',
    }),
    InvoiceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
