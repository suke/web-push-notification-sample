import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription as SubscriptionEntity } from 'src/models/subscription.entity';
import { Subscription } from 'src/interfaces/subscription.interface';

webpush.setVapidDetails(
  'mailto: example@example.org',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  addSubscription(params: Subscription) {
    return this.subscriptionRepository.save(params);
  }

  async notify(message: string) {
    const subscriptions = await this.subscriptionRepository.find({});

    Promise.all(
      subscriptions.map(subscription => {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            auth: subscription.auth,
            p256dh: subscription.p256dh,
          },
        };

        const notificationPayload = {
          notification: {
            title: 'New Notification',
            body: message,
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1,
            },
            actions: [
              {
                action: 'explore',
                title: 'Go to the site',
              },
            ],
          },
        };
        return webpush.sendNotification(
          pushSubscription,
          JSON.stringify(notificationPayload),
        );
      }),
    );
  }
}
