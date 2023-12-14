import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Question } from "../questions/question.entity";
@Entity()
export class Quiz{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;  

    @Column({default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-Jw1592injOvofHGRLyWsd0rTsjr3vkP_w&usqp=CAU"})
    img_url: string;

    @Column({default: true})
    is_active: boolean;

    @OneToMany(() => Question, (question) => question.quiz)
    questions: Question[];  
}