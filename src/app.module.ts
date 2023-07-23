import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      path: '/graphql',
      typePaths: ['./**/*.normal.graphql'],
      resolvers: {
        DateTime: DateTimeResolver,
      },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    NotificationsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
