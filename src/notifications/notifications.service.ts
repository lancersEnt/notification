import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createNotificationInput: Prisma.NotificationCreateInput) {
    return this.prisma.notification.create({
      data: createNotificationInput,
    });
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  findUserNotifications(targetUserId: string) {
    return this.prisma.notification.findMany({
      where: {
        targetUserId,
      },
    });
  }

  findOne(uniqueInput: Prisma.NotificationWhereUniqueInput) {
    return this.prisma.notification.findUnique({
      where: uniqueInput,
    });
  }

  update(
    uniqueInput: Prisma.NotificationWhereUniqueInput,
    updateNotificationInput: Prisma.NotificationUpdateInput,
  ) {
    return this.prisma.notification.update({
      where: uniqueInput,
      data: updateNotificationInput,
    });
  }

  remove(uniqueInput: Prisma.NotificationWhereUniqueInput) {
    return this.prisma.notification.delete({
      where: uniqueInput,
    });
  }
}
