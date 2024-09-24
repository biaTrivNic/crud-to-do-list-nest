import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //cria ORM (Object Relational Mapper) - inteacao com db
import { ConfigModule } from '@nestjs/config'; // carrega variaveis .env
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './task/entidades/task.entity';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), //traz o .env // aqui esta global
    TypeOrmModule.forRoot({ //configuracao da conexao 
      type: 'mysql', 
      host: process.env.DATABASE_HOST, 
      port: parseInt(process.env.DATABASE_PORT, 10), 
      username: process.env.DATABASE_USER, 
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE_NAME, 
      entities: [Task], // ---> classes que representam uma tabela no banco de dados
      synchronize: true, 
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
