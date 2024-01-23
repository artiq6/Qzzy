import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class Score{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    quiz_id: number;

    @Column()
    correct_answers: number;

    @Column()
    all_answers: number;

    @CreateDateColumn({ type: 'timestamp' })
    date: Date;
}