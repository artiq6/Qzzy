import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) { }

    async create(quizId: number, questionData: Partial<Question>): Promise<Question> {
        const question = this.questionRepository.create({ ...questionData, quiz: { id: quizId } });
        return await this.questionRepository.save(question);
    }

    async findAllByQuiz(quizId: number): Promise<Question[]> {
        return this.questionRepository.find({ where: { quiz: { id: quizId } } });
    }

    async findOne(id: number): Promise<Question>{
        return this.questionRepository.findOne({where: {id}});
    }

    async remove(id: number): Promise<void> {
        const question = await this.questionRepository.findOne({where: {id}});
        if (!question) {
            throw new NotFoundException(`Question with id ${id} not found`);
        }
        await this.questionRepository.remove(question);
    }
}