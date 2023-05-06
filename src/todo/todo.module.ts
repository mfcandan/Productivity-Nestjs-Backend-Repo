import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDo, ToDoSchema } from './todo.schema';
import { ToDoService } from './todo.service';
import { ToDoController } from './todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]),
  ],
  providers: [ToDoService],
  controllers: [ToDoController],
})
export class ToDoModule {}
