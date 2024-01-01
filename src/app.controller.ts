import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "./user.models";
import { JwtGuard } from "./auth/guards/jwt-auth.guard";

@Controller()
export class AppController {
  getHello(): any {
    throw new Error("Method not implemented.");
  }
  constructor(private readonly appService: AppService) {}
  @Post()
  async create(@Body() user: User) {
    return this.appService.create(user);
  }
  // @HttpCode(HttpStatus.OK)
  // @Post("/login")
  // async login(@Body() user: User) {
  //   return this.appService.login(user);
  // }
  @Get()
  findAll() {
    return this.appService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appService.findOne(id);
  }
  @Put(":id")
  update(@Param("id") id: string, @Body() UserUpdateDto): Promise<User> {
    return this.appService.updateUser(id, UserUpdateDto);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appService.deleteUser(id);
  }
  // @Post()
  // async create(@Body() createUserDto: User) {
  //   this.appService.create(createUserDto);
  // }
}
