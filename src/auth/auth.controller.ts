import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, CommonResponse, ValidateResponse } from './auth.pb';
import {
  LoginRequestDto,
  RegisterRequestDto,
  ValidateRequestDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private register(payload: RegisterRequestDto): Promise<CommonResponse> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private login(payload: LoginRequestDto): Promise<CommonResponse> {
    return this.service.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.service.validate(payload);
  }
}
