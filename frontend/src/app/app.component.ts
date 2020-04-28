import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="subscribeToNotifications()">
      Subscribe
    </button>
  `,
})
export class AppComponent {
  // set your VAPID_PUBLIC_KEY
  readonly VAPID_PUBLIC_KEY = '';

  constructor(
    private swPush: SwPush,
    private notificationService: NotificationService,
  ) {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) =>
        this.notificationService.addPushSubscriber(sub).subscribe(),
      );
  }
}
