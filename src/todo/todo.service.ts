// src/todo/todo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDo } from './todo.schema';

@Injectable()
export class ToDoService {
  constructor(@InjectModel(ToDo.name) private toDoModel: Model<ToDo>) {}

  async create(userId: string, task: string): Promise<ToDo> {
    const newToDo = new this.toDoModel({ userId, task });
    return newToDo.save();
  }

  async findAll(userId: string): Promise<ToDo[]> {
    return this.toDoModel.find({ userId }).exec();
  }

  async findOne(userId: string, id: string): Promise<ToDo> {
    return this.toDoModel.findOne({ userId, _id: id }).exec();
  }

  async update(
    userId: string,
    id: string,
    task: string,
    completed: boolean,
  ): Promise<ToDo> {
    return this.toDoModel
      .findOneAndUpdate({ userId, _id: id }, { task, completed }, { new: true })
      .exec();
  }

  async delete(userId: string, id: string): Promise<ToDo> {
    return this.toDoModel.findOneAndDelete({ userId, _id: id }).exec();
  }
}
