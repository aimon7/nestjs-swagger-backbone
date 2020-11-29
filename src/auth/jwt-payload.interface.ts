import { UserDto } from '../user/models/user.dto';

export interface JwtPayload {
  user: UserDto;
}