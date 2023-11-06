
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './score.entity';

@Controller('quizzes/scores/:id')
export class ScoresController {
    constructor(private readonly scoreService: ScoresService) { }

    @Post()
    async create(@Param('id') quizId: number, @Body() scoreData: Partial<Score>): Promise<Score> {
        return this.scoreService.create(quizId, scoreData);
    }

    // @Get()
    // async findAll(@Param('id') quizId: number): Promise<Question[]> {
    //     return this.questionService.findAllByQuiz(quizId);
    // }

    // @Delete('/:id')
    // async remove(@Param('id') id: number): Promise<void> {
    //     return this.questionService.remove(id);
    // }
}