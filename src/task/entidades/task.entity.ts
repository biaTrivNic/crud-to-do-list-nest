import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks') 
export class Task {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ length: 30 })
  name: string; 

  @Column({
    type: 'enum',
    enum: ['done', 'pending'],
    default: 'pending', 
  })
  status: 'done' | 'pending'; 
}