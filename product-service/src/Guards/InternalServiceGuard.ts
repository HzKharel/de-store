import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InternalServiceGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    if (!token) {
      throw new HttpException('Token not found!', HttpStatus.FORBIDDEN);
    }
    // verify interprocess tokens!
    return true;
  }
}
