import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(process.env.JWT_SECRET),
        signOptions: {
          expiresIn: 2 * 60 * 60, // expires in 2 hour
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy ],
  exports: [AuthService],
})
export class AuthModule {
}
