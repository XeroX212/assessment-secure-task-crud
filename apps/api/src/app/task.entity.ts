import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.createdTasks, { eager: true })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { eager: true, nullable: true })
  assignee?: User;
}
