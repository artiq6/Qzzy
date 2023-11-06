import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';

@Injectable()
export class QuizzesService {
    
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>){}
        
    async findAll(): Promise<Quiz[]>{
        return this.quizRepository.find();
    }

    async findOne(id: number): Promise<Quiz>{
        return this.quizRepository.findOne({where: {id}});
    }

    async add(quiz: Partial<Quiz>): Promise<Quiz>{
        const newquiz= this.quizRepository.create(quiz);
        return this.quizRepository.save(newquiz)
    }

    // async update(id: number, user: Partial<User>): Promise<User> {
    //     await this.usersRepository.update(id, user);
    //     return this.usersRepository.findOne({ where: { id } });
    // }

    // async delete(id: number): Promise<void> {
    //     await this.usersRepository.delete(id);
    // }
    
}
