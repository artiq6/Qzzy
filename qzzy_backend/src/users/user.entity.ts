import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}