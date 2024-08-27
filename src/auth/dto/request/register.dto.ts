import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class RegisterDto {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
