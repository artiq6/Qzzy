import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    surname: string

    @Column({ nullable: true })
    phone: string

    @OneToOne(() => User, (user) => user.userData)
    @JoinColumn()
    user: User;
}