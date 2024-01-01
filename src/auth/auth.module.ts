import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AppService } from "src/app.service";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local-strategy";
import { AppModule } from "src/app.module";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { RefreshJwtStrategy } from "./strategies/refreshToken.strategy";
import { UserSchema } from "src/user.models";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  providers: [
    AuthService,
    AppService,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
    AppService,
  ],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
    forwardRef(() => AppModule),
    JwtModule.register({
      secret: `$process.env.jwt_secret`,
      signOptions: { expiresIn: "60s" },
    }),
  ],
})
export class AuthModule {}
