import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional() 
  @IsString({message: "o nome deve ser uma string"})
  @IsNotEmpty({message: "o nome nao pode estar vazio"})
  name: string;

  @IsOptional() 
  @IsNotEmpty({message: "o status nao pode estar vazio"})
  @IsEnum(['done', 'pending'], {message: "o status deve ser ou 'done' ou 'pending'"})
  status: 'done' | 'pending';
}