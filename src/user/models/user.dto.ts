import { IsBoolean, IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from './user.interface';

export class IdParamDto {
    @IsNumber()
    @ApiProperty()
    id: number;
}

export class EmailParamDto {
    @IsEmail()
    @ApiProperty({description: `The user's email`})
    email: string;
}

export class UserDto {
    @IsString()
    @ApiProperty({description: `The user's username`})
    username: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's first name`})
    firstName?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's last name`})
    lastName?: string;

    @IsEmail()
    @ApiProperty({description: `The user's email`})
    email: string;

    @IsBoolean()
    @ApiProperty({description: `A boolean flag to keep track if the user validated his email address`})
    emailValidated: boolean;

    @IsEnum(UserRole)
    @ApiProperty({enum: UserRole, default: UserRole.USER, description: `The role of the user. Default value is user`})
    role: UserRole;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `A string representing the image location to user's avatar`})
    profileImage?: string;

    @IsString()
    @ApiProperty({description: `A validation string, so we can validate the user`})
    validationString: string;

    @IsDate()
    @ApiProperty({description: `The user's creation date`})
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional({description: `Date of the last time the user updated his info`})
    updatedAt?: Date;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional({description: `Date that we archived the user`})
    deletedAt?: Date;
}

export class CreateUserDto {
    @IsString()
    @ApiProperty({description: `The user's username`})
    username: string;

    @IsString()
    @ApiProperty({description: `The user's password`})
    password: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's first name`})
    firstName?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's last name`})
    lastName?: string;

    @IsEmail()
    @ApiProperty({description: `The user's email`})
    email: string;

    @IsEnum(UserRole)
    @ApiProperty({enum: UserRole, default: UserRole.USER, description: `The role of the user. Default value is user`})
    role: UserRole;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `A string representing the image location to user's avatar`})
    profileImage?: string;

    validationString: string;
}

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's email`})
    email?: string;

    @IsEnum(UserRole)
    @ApiProperty({enum: UserRole, description: `The role of the user. Default value is user`})
    role?: UserRole;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's password`})
    password?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's first name`})
    firstName?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `The user's last name`})
    lastName?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({description: `A string representing the image location to user's avatar`})
    profileImage?: string;
}

export class UserLoginDto {
    @IsString()
    @ApiProperty({description: `The user's email or username`})
    usernameOrEmail: string;

    @IsString()
    @ApiProperty({description: `The user's email or username`})
    password: string;
}
