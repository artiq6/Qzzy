import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { UserData } from './user-data.entity';
import { Score } from 'src/scores/score.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mail: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column({default: false})
    is_admin: boolean;

    @OneToOne(() => UserData, { cascade: true, eager: true })
    @JoinColumn()
    userData: UserData;

    @OneToMany(() => Score, score => score.user)
    score: Score[];
}