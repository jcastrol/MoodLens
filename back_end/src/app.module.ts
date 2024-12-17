import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Usuarios as User } from './auth/entity/user.entity'; // Importa la entidad de usuario


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql', // MySQL
      host: process.env.DB_HOST || 'database-1.c9428sgo24fh.eu-central-1.rds.amazonaws.com',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'adminadmin',
      database: process.env.DB_NAME || 'proyecto',
      entities: [User], // Añade aquí todas las entidades necesarias
      synchronize: false, 
    }),
    UploadModule,
    AuthModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

