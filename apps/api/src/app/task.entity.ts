import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'in-progress' | 'done';

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  owner: User;
}