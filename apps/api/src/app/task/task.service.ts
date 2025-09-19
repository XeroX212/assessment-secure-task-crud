import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { User } from '../user.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  create(title: string, description: string, owner: User) {
    const task = this.repo.create({ title, description, owner });
    return this.repo.save(task);
  }

  findAll(ownerId: number) {
    return this.repo.find({ where: { owner: { id: ownerId } } });
  }

  update(id: number, attrs: Partial<Task>) {
    return this.repo.update(id, attrs);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}