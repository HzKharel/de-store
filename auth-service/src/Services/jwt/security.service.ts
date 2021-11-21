import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAuthInterface } from '../../Interfaces/UserAuthInterface';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  privateKey: string;
  saltRounds: number;
  constructor() {
    //ideally don't hard code this and fetch from config
    this.privateKey = 'superSecretKey';
    this.saltRounds = 10;
  }
  generateJWT(email: string, password: string, profileId: string): string {
    return jwt.sign(
      { email: email, password: password, profileId },
      this.privateKey,
    );
  }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async verifyPassword(plaintext: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, hash);
  }

  async validateToken(token: string): Promise<UserAuthInterface> {
    try {
      return (await jwt.verify(token, this.privateKey)) as UserAuthInterface;
    } catch (e) {
      throw new HttpException('JWT not valid!', HttpStatus.FORBIDDEN);
    }
  }
}
