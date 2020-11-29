import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto, IdParamDto, UpdateUserDto, UserDto } from './models/user.dto';
import { User } from './models/user.interface';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UserService) {
  }

  @Post()
  @ApiOperation({
    summary: 'User Registration',
    description: 'User registration endpoint'
  })
  @ApiBody({
    description: 'User Dto',
    type: [CreateUserDto]
  })
  async register(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.usersService.createUser(user);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in',
    description: 'Log in endpoint, with username or email and password',
  })
  @ApiParam({ name: 'usernameOrEmail', type: String, required: true })
  @ApiParam({ name: 'password', type: String, required: true })
  async login(@Param() usernameOrEmail: string, @Param() password: string): Promise<any> {
    return await this.usersService.login(usernameOrEmail, password);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Show all users',
    description: 'Show all users, for admins',
  })
  async index(): Promise<UserDto[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Show a single user',
    description: 'Show all fields of a user, provided an id, for admins',
  })
  @ApiParam({ name: 'id', type: String })
  async getUserById(@Param() id: number) {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update an existing User',
    description: 'Update an existing User',
  })
  @ApiParam({ name: 'id', type: String })
  async update(@Param() params: IdParamDto, @Body() body: UpdateUserDto) {
    await this.usersService.updateUser(params.id, <Partial<User>>body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an existing User',
    description:
      'Delete an existing User, only Admins can do this operation',
  })
  @ApiParam({ name: 'id', required: true, type: String })
  public async delete(@Request() req, @Param('id') id) {
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST,
      );

    await this.usersService.deleteUserById(id);
  }
}
