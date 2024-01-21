import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserData } from './user-data.entity';
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
}