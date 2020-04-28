import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forRoot(), NotificationsModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
