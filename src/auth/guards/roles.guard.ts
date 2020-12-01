import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { UserDto } from '../../user/models/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Get the roles from inside the Decorator above of the endpoint
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // If no Roles Guard/annotation in the endpoint then return true (we can see the content)
    if (!roles)
      return true;

    const req = context.switchToHttp().getRequest();
    // We made in the JwtStrategy that after the validation we add to the payload the user entity
    return this.userService.getUserById(req.user.user.id)
      .then((user: UserDto) => {
        // Check if the role of the user is inside the guard
        const hasRole = roles.indexOf(user.role) > -1;
        let hasPermission = false;

        if (hasRole)
          hasPermission = true;

        return user && hasPermission;
      })
      .catch(err => {
        console.log(err.message);
        console.log(err);
        throw new UnauthorizedException(`You have no permission here!!!`);
      });

  }
}
