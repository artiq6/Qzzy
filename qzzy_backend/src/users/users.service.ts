import { Injectable, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>) { }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findOneByEmail(mail: string): Promise<User> {
        return this.usersRepository.findOne({ where: { mail } })
    }

    async register(user: Partial<User>): Promise<User> {
        // Sprawdzenie, czy użytkownik o podanym mailu już istnieje
        if(!user.mail){
            console.log("email jest pusty")
            throw new ConflictException('email jest pusty');
        }
        const existingUser = await this.findOneByEmail(user.mail);
        console.log(user.mail, existingUser)

        // Jeśli istnieje, rzucamy wyjątek ConflictException
        if (existingUser) {
            throw new ConflictException('Użytkownik o podanym adresie e-mail już istnieje');
        }

        // Haszowanie hasła i zapis nowego użytkownika
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const newUser = this.usersRepository.create(user);

        return this.usersRepository.save(newUser);
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, user);
        return this.usersRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

}
