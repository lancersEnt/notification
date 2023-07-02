import { Injectable } from '@nestjs/common';
import { Kafka, Producer, logLevel } from 'kafkajs';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private readonly notificationsService: NotificationsService) {
    this.kafka = new Kafka({
      clientId: 'MyKlad',
      brokers: ['localhost:9092'],
      logLevel: logLevel.ERROR,
    });

    this.producer = this.kafka.producer();
  }

  async produce(topic: string, message: string): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
    await this.producer.disconnect();
  }

  async consume(topics: string[]): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: 'MK-notifications' });

    await consumer.connect();
    await Promise.all(topics.map((topic) => consumer.subscribe({ topic })));

    await consumer.run({
      eachBatchAutoResolve: true,
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        const payload = JSON.parse(message.value.toString()).payload;
        this.notificationsService.create({
          ...payload,
          seen: false,
        });
        await heartbeat();
      },
    });
  }

  async onModuleInit() {
    await this.consume(['notifications']);
  }
}
