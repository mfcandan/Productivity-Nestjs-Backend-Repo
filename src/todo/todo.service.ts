// src/todo/todo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo } from './todo.schema';
import { CreateToDoDto, UpdateToDoDto } from './todo.dto';

@Injectable()
export class ToDoService {
  constructor(@InjectModel(ToDo.name) private toDoModel: Model<ToDo>) {}

  async create(userId: string, createToDoDto: CreateToDoDto) {
    const newToDo = new this.toDoModel({
      userId,
      task: createToDoDto.task,
      tag: createToDoDto.tag,
      completed: false,
    });
    return newToDo.save();
  }

  async findAll(userId: string): Promise<ToDo[]> {
    return this.toDoModel.find({ userId }).exec();
  }

  async findOne(userId: string, id: string): Promise<ToDo> {
    return this.toDoModel.findOne({ userId, _id: id }).exec();
  }

  async update(userId: string, id: string, updateToDoDto: UpdateToDoDto) {
    const toDo = await this.findOne(userId, id);
    if (updateToDoDto.task) {
      toDo.task = updateToDoDto.task;
    }
    if (updateToDoDto.tag) {
      toDo.tag = updateToDoDto.tag;
    }
    if (updateToDoDto.completed !== undefined) {
      toDo.completed = updateToDoDto.completed;
    }
    return toDo.save();
  }

  async delete(userId: string, id: string): Promise<ToDo> {
    return this.toDoModel.findOneAndDelete({ userId, _id: id }).exec();
  }
}
