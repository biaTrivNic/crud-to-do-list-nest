import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entidades/task.entity';

// aqui vai regra de negocio

// repositorio = entre a aplicação e o banco de dados - faz find, save, delete ...
// cada entidade deve ter o seu

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) //injeta repositorio de Task
    private taskRepository: Repository<Task>,
  ) {}

  async create(taskData: Partial<Task>): Promise<Task> { //partial -> propriedades opcionais, nao preciso passar o id
    try {
      const task = await this.taskRepository.save(this.taskRepository.create(taskData));
      console.log('Tarefa criada com sucesso:', task);
      return task;
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
    }
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}