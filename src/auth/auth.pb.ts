/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface CommonResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  message: string;
}

/** Validate */
export interface ValidateRequest {
  accessToken: string;
}

export interface ValidateResponse {
  success: boolean;
  userId: number;
}

/** Register */
export interface RegisterRequest {
  username: string;
  email: string;
  fullName: string;
  password: string;
}

/** Login */
export interface LoginRequest {
  username: string;
  password: string;
}

/** RefreshToken */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Recovery Password */
export interface RecoveryPasswordRequest {
  password: string;
  recoveryPasswordToken: string;
}

export interface RecoveryPasswordResponse {
  success: boolean;
  message: string;
}

/** Logout */
export interface LogoutRequest {
  accessToken: string;
}

export interface LogoutResponse {
  success: boolean;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<CommonResponse>;

  login(request: LoginRequest): Observable<CommonResponse>;

  refreshToken(request: RefreshTokenRequest): Observable<CommonResponse>;

  recoveryPassword(request: RecoveryPasswordRequest): Observable<RecoveryPasswordResponse>;

  logout(request: LogoutRequest): Observable<LogoutResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  login(request: LoginRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  refreshToken(request: RefreshTokenRequest): Promise<CommonResponse> | Observable<CommonResponse> | CommonResponse;

  recoveryPassword(
    request: RecoveryPasswordRequest,
  ): Promise<RecoveryPasswordResponse> | Observable<RecoveryPasswordResponse> | RecoveryPasswordResponse;

  logout(request: LogoutRequest): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "refreshToken", "recoveryPassword", "logout", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
