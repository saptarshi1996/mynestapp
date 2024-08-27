import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import CreateUserDto from './dto/create-user.dto';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(userDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: userDto as User,
      select: { id: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async getUserById(id: number) {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }
}
