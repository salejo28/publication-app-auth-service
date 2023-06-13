import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService as Jwt } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class JwtService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne({ where: { id: decoded.id } });
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (_) {
      return undefined;
    }
  }
}
