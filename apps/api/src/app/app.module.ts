import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';
import { AuthModule } from './auth/auth.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User,Task],
      synchronize: true, // for dev only
    }),
    AuthModule,
    TaskModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
