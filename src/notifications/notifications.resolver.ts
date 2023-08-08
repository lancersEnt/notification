import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification, Prisma } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

const pubSub = new PubSub();

@Resolver('Notification')
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Mutation('createNotification')
  create(
    @Args('createNotificationInput')
    createNotificationInput: Prisma.NotificationCreateInput,
  ) {
    return this.notificationsService.create(createNotificationInput);
  }

  @Query('notifications')
  findAll() {
    return this.notificationsService.findAll();
  }

  @Query('notification')
  findOne(@Args('id') id: string) {
    return this.notificationsService.findOne({ id });
  }

  @Mutation('updateNotification')
  update(
    @Args('id') id: string,
    @Args('updateNotificationInput')
    updateNotificationInput: Prisma.NotificationUpdateInput,
  ) {
    return this.notificationsService.update({ id }, updateNotificationInput);
  }

  @Mutation('removeNotification')
  remove(@Args('id') id: string) {
    return this.notificationsService.remove({ id });
  }

  @Mutation('markAsSeen')
  markAsSeen(@Args('id') id: string) {
    return this.notificationsService.markAsSeen({ id });
  }

  @Query('userNotifications')
  @UseGuards(JwtAuthGuard)
  userNotifications(@Context() context: any) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    return this.notificationsService.userNotifications(userId);
  }

  @Query('userUnseenNotificationsCount')
  @UseGuards(JwtAuthGuard)
  userUnseenNotificationsCount(@Context() context: any) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    return this.notificationsService.userUnseenNotificationsCount(userId);
  }

  @Query('userLatestNotifications')
  @UseGuards(JwtAuthGuard)
  userLatestNotifications(@Context() context: any) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    return this.notificationsService.userLatestNotifications(userId);
  }

  @ResolveField(() => User)
  user(@Parent() notification: Notification) {
    return { __typename: 'User', id: notification.createdBy };
  }

  @ResolveField(() => User)
  targetUser(@Parent() notification: Notification) {
    return { __typename: 'User', id: notification.targetUserId };
  }
}
