import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: Number,
    required: true,
  })
  age: number;
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
