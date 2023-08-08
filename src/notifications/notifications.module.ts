import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [
    NotificationsResolver,
    NotificationsService,
    PrismaService,
    UsersResolver,
  ],
})
export class NotificationsModule {}
