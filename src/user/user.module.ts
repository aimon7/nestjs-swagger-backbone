import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from './models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}