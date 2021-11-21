import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServerInfoInterface } from '../../Interfaces/ServerInfoInterface';
import { UserAuthInterface } from '../../Interfaces/UserAuthInterface';
import { InjectModel } from '@nestjs/mongoose';
import { SchemaDefinition } from '../../Schema/SchemaDefinition';
import { Model } from 'mongoose';
import { SecurityService } from '../jwt/security.service';
import { UserRegisterDataInterface } from '../../Interfaces/UserRegisterDataInterface';
import { v4 as uuid } from 'uuid';
import { UserDataInterface } from '../../Interfaces/UserDataInterface';
import { PasswordResetInterface } from '../../Interfaces/PasswordResetInterface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SchemaDefinition.UserAuth)
    private readonly userAuthDB: Model<UserAuthInterface>,
    @InjectModel(SchemaDefinition.UserProfile)
    private readonly userProfileDB: Model<UserDataInterface>,
    private securityService: SecurityService,
  ) {}

  serverStatus(): ServerInfoInterface {
    //ideally get information from env
    return { serviceName: 'Auth Service', serviceStatus: 'OK' };
  }

  async loginUser(authData: UserAuthInterface) {
    const userInfo: UserAuthInterface = await this.userAuthDB.findOne({
      email: authData.email,
    });
    if (userInfo) {
      const passwordsMatch: boolean = await this.securityService.verifyPassword(
        authData.password,
        userInfo.password,
      );
      if (passwordsMatch) {
        const token = this.securityService.generateJWT(
          userInfo.email,
          userInfo.password,
          userInfo.profileId,
        );
        const userData = await this.userProfileDB.findOne({
          profileId: userInfo.profileId,
        });
        return { token: token, userData: userData };
      }
    }
    throw new HttpException(
      'Email & Password not found.',
      HttpStatus.FORBIDDEN,
    );
  }

  async registerUser(registerData: UserRegisterDataInterface) {
    // check if email exists
    const existingAccount: UserAuthInterface = (await this.userAuthDB.findOne({
      email: registerData.email,
    })) as UserAuthInterface;
    // if account already exists
    if (existingAccount) {
      throw new HttpException(
        'Account already registered',
        HttpStatus.CONFLICT,
      );
    }

    //register a new user
    const encryptPassword = await this.securityService.encryptPassword(
      registerData.password,
    );
    //create a profile ID
    const profileId = uuid();

    //save auth
    await this.userAuthDB.create({
      email: registerData.email,
      password: encryptPassword,
      profileId: profileId,
    });

    //save profile
    // make isManager more dynamic (dont use ternary operator to set is manager)
    await this.userProfileDB.create({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      isManager: registerData.email.includes('admin'),
      profileId: profileId,
    });

    return {
      message: 'account registered! you can log in with your credentials',
    };
  }

  async isUserManager(profileId: string) {
    const userData: UserDataInterface = await this.userProfileDB.findOne({
      profileId: profileId,
    });
    return userData.isManager;
  }

  async forgotPassword(email: string) {
    const userData: UserAuthInterface = (await this.userAuthDB.findOne({
      email: email,
    })) as UserAuthInterface;
    if (userData) {
      const tempPass = await this.securityService.encryptPassword('helloworld');
      await this.userAuthDB.findOneAndUpdate(
        { email: email },
        { password: tempPass },
        { upsert: true },
      );
      //call email microservice to send the reset email with a temp password
    }
    return 'An email will be sent if an account exists.';
  }

  async resetPassword(resetPasswordData: PasswordResetInterface) {
    let userAuthData: UserAuthInterface = (await this.userAuthDB.findOne({
      email: resetPasswordData.email,
    })) as UserAuthInterface;
    if (resetPasswordData.email) {
      const isCurrentPasswordValid = await this.securityService.verifyPassword(
        resetPasswordData.currentPassword,
        userAuthData.password,
      );
      if (isCurrentPasswordValid) {
        const encryptedNewPassword = await this.securityService.encryptPassword(
          resetPasswordData.newPassword,
        );
        userAuthData = await this.userAuthDB.findOneAndUpdate(
          { email: resetPasswordData.email },
          { profileId: encryptedNewPassword },
          { upsert: true, new: true },
        );
        console.log(userAuthData);
        return {
          message: 'Password updated successfully',
          token: await this.securityService.generateJWT(
            userAuthData.email,
            userAuthData.password,
            userAuthData.profileId,
          ),
        };
      }
      throw new HttpException(
        'Current password incorrect!',
        HttpStatus.FORBIDDEN,
      );
    }
    throw new HttpException('Account does not exist!', HttpStatus.FORBIDDEN);
  }
}
