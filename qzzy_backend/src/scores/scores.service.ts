import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { Quiz } from 'src/quizzes/quiz.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository: Repository<Score>,
    ) { }

    async findAll(): Promise<Score[]> {
        return this.scoreRepository.find();
    }

    async create(quizId: number, scoreData: Partial<Score>): Promise<Score> {
        return await this.scoreRepository.save(scoreData);
    }

    async getTopQuiz(): Promise<any> {
        const query = this.scoreRepository.createQueryBuilder('score')
            .select([
                'score.quiz_id AS quiz_id',
                'quiz.name AS quiz_name',
                'AVG((score.correct_answers * 100.0) / score.all_answers) AS average_percentage_correct',
                'count(score.quiz_id) AS frequency'
            ])
            .innerJoin(Quiz, 'quiz', 'score.quiz_id = quiz.id')
            .groupBy('score.quiz_id, quiz.name')
            .addOrderBy('frequency', 'DESC');

        return await query.getRawMany();
    }
    async getTopUser(): Promise<any> {
        const query = this.scoreRepository.createQueryBuilder('score')
            .select([
                'score.user_id',
                'user.login',
                'SUM(score.correct_answers) AS correct',
                'SUM(score.all_answers) AS "all"',
                'ROUND((SUM(score.correct_answers)::numeric / SUM(score.all_answers)::numeric) * 100::numeric, 2) AS percentage',
            ])
            .innerJoin(User, 'user', 'score.user_id = user.id')
            .groupBy('score.user_id, user.login')
            .addOrderBy('percentage', 'DESC'); // Order by percentage in descending order
        return await query.getRawMany();
    }


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