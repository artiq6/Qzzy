
import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { Question } from './question.entity';
import { EditQuestionDto } from './dtos/question.dto';

@Controller('quizzes/:id/questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Post()
    async create(@Param('id') quizId: number, @Body() questionData: Partial<Question>): Promise<Question> {
        return this.questionService.create(quizId, questionData);
    }

    @Get()
    async findAll(@Param('id') quizId: number): Promise<Question[]> {
        console.log(quizId)
        return this.questionService.findAllByQuiz(quizId);
    }

    @Get("/:qid")
    async findOne(@Param('qid') quizId: number): Promise<Question> {
        return this.questionService.findOne(quizId);
    }

    @Put('/:qid')
    async update(
        @Param('qid') id: number,
        @Body() questionData: EditQuestionDto,
    ): Promise<void> {
        return await this.questionService.update(id, questionData);
    }

    @Delete('/:qid')
    async remove(@Param('qid') id: number): Promise<void> {
        return this.questionService.remove(id);
    }
}