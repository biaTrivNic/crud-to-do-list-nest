import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional() 
  @IsString({message: "o title deve ser uma string"})
  @IsNotEmpty({message: "o title nao pode estar vazio"})
  title: string;

  @IsOptional() 
  @IsNotEmpty({message: "o status nao pode estar vazio"})
  @IsEnum(['done', 'pending'], {message: "o status deve ser ou 'done' ou 'pending'"})
  status: 'done' | 'pending';
}