import { Controller, Post, Get, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { Task } from '../task.entity';
import { User } from '../user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

    @Post()
    create(@Body() body: { title: string; description?: string }, @Request() req) {
    return this.taskService.create(body.title, body.description, { id: req.user.userId } as User);
    }

  @Get()
  findAll(@Request() req) {
    return this.taskService.findAll(req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Task>) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
