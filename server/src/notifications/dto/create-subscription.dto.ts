export class CreateSubscriptionDto {
  readonly endpoint: string;
  readonly expirationTime: string;
  keys: {
    readonly p256dh: string;
    readonly auth: string;
  };
}
