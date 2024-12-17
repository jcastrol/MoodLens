import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(
    @InjectRepository(Usuarios)
    private userRepository: Repository<Usuarios>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('AWS_REGION')
    });
  }
  private calculateSecretHash(email: string): string {
    const clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
    const clientSecret = this.configService.get<string>('COGNITO_CLIENT_SECRET');
    console.log (clientId,clientSecret)
    return crypto.createHmac('SHA256', clientSecret)
                 .update(email + clientId)
                 .digest('base64');
  }
  async register(name: string, email: string, password: string) {
    try {
      const command = new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
      });

      await this.cognitoClient.send(command);

      const user = this.userRepository.create({ name, email });
      await this.userRepository.save(user);

      return { message: 'User registered successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(email: string, password: string) {
    try {
      const secretHash = this.calculateSecretHash(email);

      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: secretHash, // Incluir el SECRET_HASH aquí
        },
      });

      const response = await this.cognitoClient.send(command);

      // Buscar al usuario en tu base de datos
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      // Firmar el JWT con los datos del usuario
      const payload = { username: user.name, sub: user.uuid };
      return {
        
        accessToken: this.jwtService.sign(payload),
        idToken: response.AuthenticationResult?.IdToken,
        refreshToken: response.AuthenticationResult?.RefreshToken,
      };
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
