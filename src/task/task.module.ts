import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entidades/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

// isso agrupa tudo 

@Module({
  imports: [TypeOrmModule.forFeature([Task])], //entidade
  providers: [TaskService], //servico
  controllers: [TaskController], //controller
})
export class TaskModule {}