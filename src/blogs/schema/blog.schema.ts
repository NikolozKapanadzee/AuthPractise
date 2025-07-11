import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class Blog {
  @Prop({
    type: String,
    required: true,
  })
  title: string;
  @Prop({
    type: String,
    required: true,
  })
  content: string;
  @Prop({
    type: String,
    required: true,
  })
  location: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author: mongoose.Schema.Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
