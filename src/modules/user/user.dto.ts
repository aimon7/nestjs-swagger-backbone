import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class IdParamDto {
  @IsNumber()
  id: number;
}
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiModelPropertyOptional()
  email: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  password: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  username: string;

  @IsString()
  @ApiModelPropertyOptional()
  firstName: string;

  @IsString()
  @ApiModelPropertyOptional()
  lastName: string;

  @IsOptional()
  @ApiModelProperty()
  emailValidated: boolean;

  dateDeleted?: Date;

}