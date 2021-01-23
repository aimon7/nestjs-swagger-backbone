import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env', ''],
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
