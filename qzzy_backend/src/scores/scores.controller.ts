
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './score.entity';

@Controller('quizzes/scores')
export class ScoresController {
    constructor(private scoreService: ScoresService) { }



    @Get('/all')
    async findAll(): Promise<Score[]> {
        return this.scoreService.findAll();
    }

    @Get("/topquiz")
    async getTopQuiz(): Promise<any> {
        return this.scoreService.getTopQuiz();
    }
    @Get("/topuser")
    async getTopUser(): Promise<any> {
        return this.scoreService.getTopUser();
    }


    @Post("/:id")
    async create(@Param('id') quizId: number, @Body() scoreData: Partial<Score>): Promise<Score> {
        return this.scoreService.create(quizId, scoreData);
    }
    

    // @Delete('/:id')
    // async remove(@Param('id') id: number): Promise<void> {
    //     return this.questionService.remove(id);
    // }
}