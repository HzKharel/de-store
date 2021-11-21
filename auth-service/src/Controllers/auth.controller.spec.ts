import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './authController';
import { AuthService } from '../Services/auth/auth.service';
import { Model } from 'mongoose';
import { UserAuthInterface } from '../Interfaces/UserAuthInterface';
import { UserDataInterface } from '../Interfaces/UserDataInterface';

describe('PriceController', () => {
  let appController: AuthController;
  let userAuthModel: Model<UserAuthInterface>;
  let userProfileModel: Model<UserDataInterface>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getServerStatus()).toBe('Hello World!');
    });
  });
});
