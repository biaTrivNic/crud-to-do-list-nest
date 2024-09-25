import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, Delete, Patch, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/task.dto';
import { Task } from './entidades/task.entity';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { UpdatePutTaskDto } from './dtos/updatePutTask.dto';

//isso lida com as requisicoes

@Controller('tasks') // rota --> /tasks
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true })) // transformação e validação
    async create(@Body() taskData: CreateTaskDto): Promise<Task> {
        return this.taskService.create(taskData); // chama servico
    }

    @Get()
    async find(): Promise<Task[]> {
        return this.taskService.find();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Task> {
        return this.taskService.findById(id);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<{ message: string }> {
        await this.taskService.deleteById(id);
        console.log(`A tarefa com ID ${id} foi deletada`);
        return { message: `A tarefa com ID ${id} foi deletada` };
    }

    @Patch(':id') 
    @UsePipes(new ValidationPipe({ transform: true })) // transformação e validação
    async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(id, updateTaskDto); 
    }

    @Put(':id') 
    @UsePipes(new ValidationPipe({ transform: true })) 
    async putUpdate(@Param('id') id: number, @Body() updatePutTaskDto: UpdatePutTaskDto): Promise<Task> {
        return this.taskService.update(id, updatePutTaskDto); 
    }

}