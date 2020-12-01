import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from './user.interface';
import { Param } from '@nestjs/common';

export class IdParamDto {
  @IsNumber()
  @ApiProperty()
  id: number;
}

export class UserDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsBoolean()
  @ApiProperty()
  emailValidated: boolean;

  @IsEnum(UserRole)
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @IsString()
  @ApiPropertyOptional()
  profileImage?: string;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiPropertyOptional()
  updatedAt?: Date;

  @IsDate()
  @ApiPropertyOptional()
  deletedAt?: Date;
}

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEnum(UserRole)
  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @IsString()
  @ApiPropertyOptional()
  profileImage?: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsEnum(UserRole)
  @ApiProperty({ enum: UserRole })
  role?: UserRole;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  dateDeleted?: Date;
}

export class UserLoginDto {
  @IsString()
  @ApiProperty()
  usernameOrEmail: string;

  @IsString()
  @ApiProperty()
  password: string;
}
