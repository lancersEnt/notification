import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';
import { Subscription } from '@nestjs/graphql';

const pubSub = new PubSub();

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNotificationInput: Prisma.NotificationCreateInput) {
    const notification = await this.prisma.notification.create({
      data: createNotificationInput,
    });
    pubSub.publish('notificationCreated', {
      notificationCreated: { notification: notification },
    });
    return notification;
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  userNotifications(targetUserId: string) {
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

  @Subscription(() => Notification, {
    filter(payload, variables) {
      return (
        payload.notificationCreated.notification.targetUserId ===
        variables.userId
      );
    },
  })
  notificationCreated() {
    return pubSub.asyncIterator('notificationCreated');
  }
}
