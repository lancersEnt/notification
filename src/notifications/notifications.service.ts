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
    const search_notification = await this.prisma.notification.findFirst({
      where: createNotificationInput,
    });
    if (search_notification) return search_notification;
    if (
      createNotificationInput.targetUserId === createNotificationInput.createdBy
    )
      return null;
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  userUnseenNotificationsCount(targetUserId: string) {
    return this.prisma.notification.count({
      where: {
        targetUserId,
        seen: false,
      },
    });
  }

  userLatestNotifications(targetUserId: string) {
    return this.prisma.notification.findMany({
      where: {
        targetUserId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
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

  markAsSeen(uniqueInput: Prisma.NotificationWhereUniqueInput) {
    return this.prisma.notification.update({
      where: uniqueInput,
      data: {
        seen: true,
      },
    });
  }

  @Subscription(() => Notification, {
    filter(payload, variables) {
      return (
        payload.notificationCreated.notification.targetUserId ===
          variables.userId &&
        payload.notificationCreated.notification.createdBy !== variables.userId
      );
    },
  })
  notificationCreated() {
    return pubSub.asyncIterator('notificationCreated');
  }

  forUser(targetUserId: string) {
    return this.prisma.notification.findMany({
      where: {
        targetUserId,
      },
    });
  }
}
