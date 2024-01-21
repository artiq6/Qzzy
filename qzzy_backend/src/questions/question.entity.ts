import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Quiz } from "../quizzes/quiz.entity";
@Entity()
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    a: string;

    @Column()
    b: string;

    @Column()
    c: string;

    @Column()
    d: string;

    @Column()
    correct: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz;
}