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
import { UserService } from './user.service';
import { CreateUserDto, IdParamDto, UpdateUserDto, UserDto, UserLoginDto } from './models/user.dto';
import { User, UserRole } from './models/user.interface';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('user')
@ApiTags('Users')
export class UserController {
    constructor(private readonly usersService: UserService) {
    }

    @Post()
    @ApiOperation({
        summary: 'User Registration',
        description: 'User registration endpoint',
    })
    @ApiBody({
        description: 'Create User Dto',
        type: CreateUserDto,
    })
    async register(@Body() user: CreateUserDto): Promise<UserDto> {
        return await this.usersService.createUser(user);
    }

    @Post('login')
    @ApiOperation({
        summary: 'Log in',
        description: 'Log in endpoint, with username or email and password',
    })
    @ApiBody({type: UserLoginDto, description: `The user's login data`})
    async login(@Body() body: UserLoginDto): Promise<any> {
        return await this.usersService.login(body.usernameOrEmail, body.password);
    }

    @Get()
    @hasRoles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Show all users',
        description: 'Show all users, for admins',
    })
    async index(): Promise<UserDto[]> {
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Show a single user',
        description: 'Show all fields of a user, provided an id, for admins',
    })
    @ApiParam({name: 'id', type: String})
    async getUserById(@Param('id') id: number): Promise<UserDto> {
        return await this.usersService.getUserById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Update an existing User',
        description: 'Update an existing User',
    })
    @ApiParam({name: 'id', type: String})
    async update(@Param('id') params: IdParamDto, @Body() body: UpdateUserDto) {
        await this.usersService.updateUser(params.id, <Partial<User>>body);
    }

    @Delete(':id')
    @hasRoles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Delete an existing User',
        description:
            'Delete an existing User, only Admins can do this operation',
    })
    @ApiParam({name: 'id', type: String})
    public async delete(@Request() req, @Param('id') id: number) {
        if (!id)
            throw new HttpException(
                'ID parameter is missing',
                HttpStatus.BAD_REQUEST,
            );

        await this.usersService.deleteUserById(id);
    }
}
