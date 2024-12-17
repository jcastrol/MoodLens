import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNSClient, CreatePlatformEndpointCommand, PublishCommand } from '@aws-sdk/client-sns';

@Injectable()
export class NotificationsService {
  private snsClient: SNSClient;

  constructor(private readonly configService: ConfigService) {
    this.snsClient = new SNSClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async registerEndpoint(token: string, userData: any): Promise<string> {
    try {
      const params = {
        PlatformApplicationArn: this.configService.get<string>('SNS_PLATFORM_APPLICATION_ARN'),
        Token: token,
        Attributes: {
          UserData: JSON.stringify(userData),
        },
      };

      const command = new CreatePlatformEndpointCommand(params);
      const result = await this.snsClient.send(command);

      return result.EndpointArn;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async sendNotification(endpointArn: string, title: string, body: string): Promise<void> {
    try {
      const params = {
        Message: JSON.stringify({
          default: body,
          GCM: JSON.stringify({ notification: { title, body } }),
          APNS: JSON.stringify({ aps: { alert: { title, body } } }),
        }),
        MessageStructure: 'json',
        TargetArn: endpointArn,
      };

      const command = new PublishCommand(params);
      await this.snsClient.send(command);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
