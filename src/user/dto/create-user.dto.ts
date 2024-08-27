import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty({
    required: true,
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
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
