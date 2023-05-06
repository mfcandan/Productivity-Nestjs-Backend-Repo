import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ToDoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateToDoDto, UpdateToDoDto } from './todo.dto';

@Controller('todo')
@UseGuards(AuthGuard)
export class ToDoController {
  constructor(private toDoService: ToDoService) {}

  @Post()
  async create(@Req() req, @Body() createToDoDto: CreateToDoDto) {
    const userId = req.user.sub;
    return this.toDoService.create(userId, createToDoDto);
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
    @Body() updateToDoDto: UpdateToDoDto,
  ) {
    const userId = req.user.sub;
    return this.toDoService.update(userId, id, updateToDoDto);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.toDoService.delete(userId, id);
  }
}
