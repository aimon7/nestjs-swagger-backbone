import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
