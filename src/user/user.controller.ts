import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators/user.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUser(@GetUser() user: User) {
    return user;
  }
}
