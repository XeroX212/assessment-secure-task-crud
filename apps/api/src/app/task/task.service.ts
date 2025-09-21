import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { User } from '../user.entity';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task) private repo: Repository<Task>,
  ) {}

  private canMutateTask(user: any, task: Task) {
    console.log('👤 Current user:', user);
    console.log('📌 Task createdBy:', task.createdBy);

    if (user.role === 'Admin') return true;
    if (user.role === 'Owner' && task.createdBy.id === user.id) {
      return true;
    }
    return false;
  }



  async findAllForUser(user: User) {
    console.log(' Filtering tasks for user:', user);

    if (user.role === 'Admin') {
      return this.repo.find({ relations: ['createdBy', 'assignee'] });
    }

    if (user.role === 'Owner') {
      return this.repo.find({
        where: [
          { createdBy: { id: user.id } },
          { assignee: { id: user.id } },
        ],
        relations: ['createdBy', 'assignee'],
      });
    }

    return this.repo.find({
      where: { assignee: { id: user.id } },
      relations: ['createdBy', 'assignee'],
    });
  }


  async create(dto: CreateTaskDto, user: User) {
    if (user.role === 'Viewer') {
      throw new ForbiddenException('Viewers cannot create tasks');
    }

    const task = this.repo.create({
      title: dto.title,
      description: dto.description,
      createdBy: { id: user.id } as User,
      assignee: dto.assigneeId ? ({ id: dto.assigneeId } as User) : { id: user.id } as User,
    });

    return this.repo.save(task);
  }


  async update(id: number, dto: UpdateTaskDto, user: User) {
  const task = await this.repo.findOne({
      where: { id },
      relations: ['createdBy'],
  });
  if (!task) throw new NotFoundException(`Task ${id} not found`);

  if (!this.canMutateTask(user, task)) {
      throw new ForbiddenException('You cannot edit this task');
  }

  // ✅ only apply fields that exist
  if (dto.title !== undefined) task.title = dto.title;
  if (dto.description !== undefined) task.description = dto.description;
  if (dto.assigneeId !== undefined) task.assignee = { id: dto.assigneeId } as User;

  return this.repo.save(task);
  }


  async delete(id: number, user: User) {
  const task = await this.repo.findOne({
      where: { id },
      relations: ['createdBy'],
  });
  if (!task) throw new NotFoundException(`Task ${id} not found`);

  if (!this.canMutateTask(user, task)) {
      throw new ForbiddenException('You cannot delete this task');
  }

  return this.repo.remove(task);
  }
}