import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from '@prisma/client';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ResolveField()
  notifications(@Parent() user: User): Promise<Notification[]> {
    return this.notificationsService.forUser(user.id);
  }
}
