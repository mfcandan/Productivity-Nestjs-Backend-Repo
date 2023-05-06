import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ToDo extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: true, default: false })
  completed: boolean;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);
