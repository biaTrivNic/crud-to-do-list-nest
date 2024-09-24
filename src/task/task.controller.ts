import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';
import { Task } from './entidades/task.entity';

//isso lida com as requisicoes

@Controller('tasks') // rota --> /tasks
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true })) // transformação e validação
    async create(@Body() taskData: CreateTaskDto): Promise<Task> {
        return this.taskService.create(taskData); // chama servico
    }
}