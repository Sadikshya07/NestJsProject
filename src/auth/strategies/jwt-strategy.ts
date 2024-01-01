import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request as RequestType } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: `$process.env.jwt_secret`,
    });
  }  
  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
  async validate(payload: any) {
    return { username: payload.username };
  }
}