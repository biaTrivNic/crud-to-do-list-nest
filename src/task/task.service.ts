import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entidades/task.entity';
import { UpdateTaskDto } from './dtos/updateTask.dto';

// aqui vai regra de negocio

// repositorio = entre a aplicação e o banco de dados - faz find, save, delete ...
// cada entidade deve ter o seu

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) //injeta repositorio de Task
    private taskRepository: Repository<Task>,
  ) { }

  async create(taskData: Partial<Task>): Promise<Task> { //partial -> propriedades opcionais, nao preciso passar o id
    try {
      const task = await this.taskRepository.save(this.taskRepository.create(taskData));
      console.error('Tarefa criada com sucesso:', task);
      return task;
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
    }
  }

  async find(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<Task> {

    const task = await this.taskRepository.findOneBy({ id })

    if (!task) {
      console.error(`A tarefa com ID ${id} não existe`)
      throw new NotFoundException(`A tarefa com ID ${id} não existe`);
    }

    return task;
  }

  async deleteById(id: number): Promise<void> {

    const task = await this.taskRepository.delete(id)

    if (task.affected === 0) {
      console.error(`A tarefa com ID ${id} não existe`)
      throw new NotFoundException(`A tarefa com ID ${id} não existe`);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {

    try {
      const task = await this.taskRepository.findOneBy({ id });

      if (!task) {
        throw new NotFoundException(`A tarefa com ID ${id} não existe`);
      }

      Object.assign(task, updateTaskDto);
      console.log('Tarefa editada com sucesso:', task);
      return this.taskRepository.save(task);
      
    } catch (error) {

      if (error instanceof NotFoundException) {
        console.error(`${error.message}`);
      } else {
        console.error('Erro ao editar a tarefa:', error);
      } 
      
      throw error;

    }

  }
}