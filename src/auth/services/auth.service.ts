import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from '../dto/auth.dto';
import { CommonResponse, ValidateResponse } from '../auth.pb';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async register(payload: RegisterRequestDto): Promise<CommonResponse> {
    const exists_with_username: User = await this.repository.findOne({
      where: {
        username: payload.username,
      },
    });

    if (exists_with_username)
      return {
        success: false,
        accessToken: undefined,
        refreshToken: undefined,
        message: 'The username is already exists',
      };

    const exists_with_email: User = await this.repository.findOne({
      where: {
        username: payload.email,
      },
    });

    if (exists_with_email)
      return {
        success: false,
        accessToken: undefined,
        refreshToken: undefined,
        message: 'Email is already exists',
      };

    const user = new User();
    user.username = payload.username;
    user.email = payload.email;
    user.fullName = payload.fullName;
    user.password = this.jwtService.encodePassword(payload.password);

    await this.repository.save(user);

    const token: string = this.jwtService.generateToken(user);
    return {
      success: true,
      accessToken: token,
      refreshToken: undefined,
      message: `Welcome ${user.username}`,
    };
  }

  public async login(payload: LoginRequestDto): Promise<CommonResponse> {
    const commonResponseFail = {
      success: false,
      message: 'Username or password incorrect',
      accessToken: undefined,
      refreshToken: undefined,
    };
    const user: User = await this.repository.findOne({
      where: { username: payload.username },
    });
    if (!user) return commonResponseFail;

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) return commonResponseFail;

    const token = this.jwtService.generateToken(user);

    return {
      success: true,
      accessToken: token,
      refreshToken: undefined,
      message: `Welcome back ${user.username}`,
    };
  }

  public async validate(
    payload: ValidateRequestDto,
  ): Promise<ValidateResponse> {
    const decoded: User = await this.jwtService.verify(payload.accessToken);

    if (!decoded) {
      return {
        userId: null,
        success: false,
      };
    }

    const auth: User = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return {
        userId: null,
        success: false,
      };
    }

    return { success: true, userId: decoded.id };
  }
}
