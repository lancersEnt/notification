import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { KafkaModule } from './kafka/kafka.module';
import { DateTimeResolver } from 'graphql-scalars';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    KafkaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: {
        DateTime: DateTimeResolver,
      },
    }),
    NotificationsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
