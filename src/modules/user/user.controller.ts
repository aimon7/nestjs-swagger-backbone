import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IdParamDto, UpdateUserDto } from './user.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Show all users',
    description: 'Show all users, for admins',
  })
  async index(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Show a single user',
    description: 'Show all fields of a user, provided an id, for admins',
  })
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
