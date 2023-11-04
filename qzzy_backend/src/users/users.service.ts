import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>){}
    
    async findAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User>{
        return this.usersRepository.findOne({where: {id}});
    }

    async register(user: Partial<User>): Promise<User>{
        user.password=await bcrypt.hash(user.password,10);
        const newuser= this.usersRepository.create(user);
        return this.usersRepository.save(newuser)
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, user);
        return this.usersRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
    
}
