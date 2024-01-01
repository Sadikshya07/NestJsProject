import * as bcrypt from "bcrypt";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;
  // @Prop({ default: Date.now })
  // date_added: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
  //console.log(this.password);
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
