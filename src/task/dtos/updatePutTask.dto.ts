import { IsString, IsEnum, IsNotEmpty} from 'class-validator';

export class UpdatePutTaskDto {
  @IsString({message: "o title deve ser uma string"})
  @IsNotEmpty({message: "o title nao pode estar vazio"})
  title: string;

  @IsNotEmpty({message: "o status nao pode estar vazio"})
  @IsEnum(['done', 'pending'], {message: "o status deve ser ou 'done' ou 'pending'"})
  status: 'done' | 'pending';
}