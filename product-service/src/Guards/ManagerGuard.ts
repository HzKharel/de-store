import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    if (!token) {
      throw new HttpException('Token not found!', HttpStatus.FORBIDDEN);
    }
    //interprocess communication with the auth microservice
    //ideally get url from config
    const url = `http://localhost:3010/auth/verifyToken`;
    try {
      const res = await axios.get(url, {
        headers: { token: token },
      });
      return res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
