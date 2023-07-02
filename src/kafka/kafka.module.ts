import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [],
  providers: [KafkaService, NotificationsService, PrismaService],
})
export class KafkaModule {}
