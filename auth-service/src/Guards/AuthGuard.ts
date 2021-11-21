import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaDefinition } from '../Schema/SchemaDefinition';
import { Model } from 'mongoose';
import { UserAuthInterface } from '../Interfaces/UserAuthInterface';
import { SecurityService } from '../Services/jwt/security.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(SchemaDefinition.UserAuth)
    private readonly userAuthDB: Model<UserAuthInterface>,
    private securityService: SecurityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    if (!token) {
      throw new HttpException('Token not found!', HttpStatus.FORBIDDEN);
    }
    //validate jwt token
    const validated: UserAuthInterface =
      await this.securityService.validateToken(token);
    const userAccountFromDB: UserAuthInterface = await this.userAuthDB.findOne({
      email: validated.email,
    });
    // return true or false
    const isValid = userAccountFromDB.password === validated.password;
    if (isValid) {
      request.email = validated.email;
      request.profileId = validated.profileId;
    }

    return isValid;
  }
}
