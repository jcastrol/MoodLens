import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('register')
  async registerEndpoint(@Body('token') token: string, @Body('userData') userData: any) {
    return this.notificationsService.registerEndpoint(token, userData);
  }

  @Post('send')
  async sendNotification(@Body('endpointArn') endpointArn: string, @Body('title') title: string, @Body('body') body: string) {
    return this.notificationsService.sendNotification(endpointArn, title, body);
  }
}
