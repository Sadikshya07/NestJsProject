import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.models";

@Injectable()
export class AppService {
  constructor(@InjectModel("user") private userModel: Model<UserDocument>) {}
  async create(userDto: User): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }
  async updateUser(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
