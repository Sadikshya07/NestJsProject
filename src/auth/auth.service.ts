import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";
import { User } from "../user.models";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log(username);
    const user = await this.appService.findOne(username);
    console.log(user);
    console.log(await bcrypt.compare(password, user.password));
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username };
    return {
      ...user, // spread user object
      access_token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: "7d" }),
    };
  }

  async refreshToken(user: User) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
