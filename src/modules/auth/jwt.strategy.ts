import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.FromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret69'  // TODO: put the secret in config
    });
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { username, email } = payload;
    const user = await this.userRepository.findOne()

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}