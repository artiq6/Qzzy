import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository: Repository<Score>,
    ) { }

    async create(quizId: number, scoreData: Partial<Score>): Promise<Score> {
        return await this.scoreRepository.save(scoreData);
    }

    // async findAllByQuiz(quizId: number): Promise<Question[]> {
    //     return this.questionRepository.find({ where: { quiz: { id: quizId } } });
    // }

    // async findOne(id: number): Promise<Question>{
    //     return this.questionRepository.findOne({where: {id}});
    // }

    // async remove(id: number): Promise<void> {
    //     const question = await this.questionRepository.findOne({where: {id}});
    //     if (!question) {
    //         throw new NotFoundException(`Question with id ${id} not found`);
    //     }
    //     await this.questionRepository.remove(question);
    // }
}