import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../jwt-auth.guard'; // This guard enforces JWT
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { User } from '../user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    console.log('🐛 req.user from JWT:', req.user);
    return this.taskService.findAllForUser(req.user);
  }

  @Post()
  create(@Body() body: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    console.log('📌 req.user:', req.user);
    return this.taskService.create(body, req.user);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @Req() req: AuthenticatedRequest
  ) {
    return this.taskService.update(id, dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    return this.taskService.delete(id, req.user);
  }
}

export interface AuthenticatedRequest extends Request {
  user: User;
}