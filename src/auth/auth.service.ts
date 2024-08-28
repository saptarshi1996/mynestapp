import {
  ForbiddenException,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

import LoginDto from './dto/request/login.dto';
import RegisterDto from './dto/request/register.dto';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private logger: LoggerService = new Logger();

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    this.logger.log(loginDto.email, loginDto.password);

    const user = await this.userService.getUserByEmail(loginDto.email);

    this.logger.log(user);

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    if (!user.is_verified) {
      throw new ForbiddenException('User not verified');
    }

    const isMatch = bcrypt.compareSync(loginDto.password, user.password);
    this.logger.log(isMatch);

    if (!isMatch) {
      throw new ForbiddenException('Password does not match.');
    }

    const token = this.jwtService.sign({ id: user.id });
    this.logger.log(token);

    return { token };
  }

  async register(registerDto: RegisterDto) {
    const userExists = await this.userService.getUserByEmail(registerDto.email);

    this.logger.log(userExists);

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    const hashed = bcrypt.hashSync(registerDto.password);
    const user = await this.userService.createUser({
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
      email: registerDto.email,
      password: hashed,
    });

    return { user };
  }
}
