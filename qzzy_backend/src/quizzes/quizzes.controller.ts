import { Body, Controller, Delete, Get, NotFoundException, Param,  Post, Put, UseGuards } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';
import { CreateQuizDto, EditQuizDto } from './dtos/quiz.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) { }

    @Get('/')
    async findAll(): Promise<Quiz[]> {
        return this.quizzesService.findAll();
    }

    @Get('/active')
    async findAllActive(): Promise<Quiz[]> {
        return this.quizzesService.findAllActive();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        const quiz = await this.quizzesService.findOne(id);
        if (!quiz) {
            throw new NotFoundException("User with id does not exist!")
        } else {
            return quiz;
        }
    }

    @Post('/add')
    async add(@Body() quizData: CreateQuizDto) {
        return this.quizzesService.add(quizData);
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() quizzData: EditQuizDto,
    ): Promise<void> {
        await this.quizzesService.update(id, quizzData);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<any> {
        const quiz = await this.quizzesService.findOne(id);
        if (!quiz) {
            throw new NotFoundException("Quiz does not exist!");
        }
        return this.quizzesService.delete(id);
    }
}