import {IsString, IsOptional, IsBoolean} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(type => Quiz, quiz => quiz.tags)
  quizzes: Quiz[];
}