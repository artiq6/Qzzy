import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';
import { CreateQuizDto, EditQuizDto } from './dtos/quiz.dto';

@Injectable()
export class QuizzesService {

    constructor(
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
        @InjectDataSource() private dataSource: DataSource
    ) { }

    async findAll(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }
    async findAllActive(): Promise<Quiz[]> {
        return this.quizRepository.find({where:{is_active: true}});
    }

    async findOne(id: number): Promise<Quiz> {
        return this.quizRepository.findOne({ where: { id } });
    }

    async add(quiz: Partial<Quiz>): Promise<Quiz> {
        const newquiz = this.quizRepository.create(quiz);
        return this.quizRepository.save(newquiz)
    }
    async update(id: number, quizzData: EditQuizDto): Promise<void> {
        const quizz = await this.findOne(id);

        if (!quizz) {
            throw new NotFoundException(`Quizz o id:${id} nie istnieje`);
        }

        this.quizRepository.merge(quizz, quizzData);
        await this.quizRepository.save(quizz);
    }
    
    async delete(id: number): Promise<void> {
        await this.quizRepository.delete(id);
    }



}
