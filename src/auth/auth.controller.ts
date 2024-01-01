import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AppService } from "src/app.service";
import { User } from "../user.models";
import { Response } from "express";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    //@InjectModel("user") private userModel: Model<UserDocument>,
    private authService: AuthService,
    private appService: AppService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Body() user: User,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { access_token } = await this.authService.login(user);
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: "ok" });
  }
  @Post("register")
  async create(@Body() user: User) {
    return this.appService.create(user);
  }
  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
