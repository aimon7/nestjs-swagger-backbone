import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { bcrypt } from 'bcryptjs';
import { UserDto } from '../user/models/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {
  }

  async generateJWT(user: UserDto): Promise<string> {
    return await this.jwtService.signAsync({ user: user});
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(newPassword: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(newPassword, passwordHash);
  }
}
