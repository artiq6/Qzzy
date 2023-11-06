
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { Question } from './question.entity';

@Controller('quizzes/:id/questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post()
    async create(@Param('id') quizId: number, @Body() questionData: Partial<Question>): Promise<Question> {
        return this.questionService.create(quizId, questionData);
    }

    @Get()
    async findAll(@Param('id') quizId: number): Promise<Question[]> {
        return this.questionService.findAllByQuiz(quizId);
    }

    @Delete('/:id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.questionService.remove(id);
    }
}