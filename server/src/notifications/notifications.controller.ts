import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post()
  notify(@Body() sendNotificationDto: SendNotificationDto) {
    this.notificationsService.notify(sendNotificationDto.message);
  }

  @Post('subscribe')
  @HttpCode(201)
  async subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    const params = { ...createSubscriptionDto, ...createSubscriptionDto.keys };
    await this.notificationsService.addSubscription(params);
    return 'created';
  }
}
