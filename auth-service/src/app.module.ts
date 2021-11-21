import { Module } from '@nestjs/common';
import { AuthController } from './Controllers/authController';
import { AuthService } from './Services/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './Schema/UserProfileSchema';
import { SchemaDefinition } from './Schema/SchemaDefinition';
import { SecurityService } from './Services/jwt/security.service';
import { UserAuthSchema } from './Schema/UserAuthSchema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/auth'),
    MongooseModule.forFeature([
      { name: SchemaDefinition.UserAuth, schema: UserAuthSchema },
      { name: SchemaDefinition.UserProfile, schema: UserProfileSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, SecurityService],
})
export class AppModule {}
