import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ToDoService } from './todo.service';

@Controller('todo')
export class ToDoController {
  constructor(private toDoService: ToDoService) {}

  @Post()
  async create(@Req() req, @Body('task') task: string) {
    const userId = req.user.sub;
    return this.toDoService.create(userId, task);
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.sub;
    return this.toDoService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.toDoService.findOne(userId, id);
  }

  @Put(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body('task') task: string,
    @Body('completed') completed: boolean,
  ) {
    const userId = req.user.sub;
    return this.toDoService.update(userId, id, task, completed);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.toDoService.delete(userId, id);
  }
}
