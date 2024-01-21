import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Quiz } from 'src/quizzes/quiz.entity';

@Entity()
export class Score{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.score)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Quiz, quiz => quiz.score)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;

    @Column()
    correct_answers: number;

    @Column()
    all_answers: number;

    @CreateDateColumn({ type: 'timestamp' })
    date: Date;
}