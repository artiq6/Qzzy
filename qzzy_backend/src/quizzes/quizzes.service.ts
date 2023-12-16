import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';

@Injectable()
export class QuizzesService {

    constructor(
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
        @InjectDataSource() private dataSource: DataSource
    ) { }

    async findAll(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }

    async findOne(id: number): Promise<Quiz> {
        return this.quizRepository.findOne({ where: { id } });
    }

    async add(quiz: Partial<Quiz>): Promise<Quiz> {
        const newquiz = this.quizRepository.create(quiz);
        return this.quizRepository.save(newquiz)
    }


    async delete(id: number): Promise<void> {
        await this.quizRepository.delete(id);
    }

}
