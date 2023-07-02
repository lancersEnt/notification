import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [NotificationsResolver, NotificationsService, PrismaService],
})
export class NotificationsModule {}
