import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Prisma } from '@prisma/client';

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
}
