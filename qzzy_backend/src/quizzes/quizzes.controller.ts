import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, Put } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';
import {CreateQuizDto } from './dtos/quiz.dto';
@Controller('quizzes')
export class QuizzesController {
    constructor(private quizzesService: QuizzesService) { }

    @Get('/')
    async findAll(): Promise<Quiz[]> {
        return this.quizzesService.findAll();
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
    async add(@Body() quiz: CreateQuizDto) {
        return this.quizzesService.add(quiz);
    }



    // //update user
    // @Put('/passwordedit/:id')
    // async update(@Param('id') id: number, @Body() password:EditUserPasswordDto ): Promise<any> {
    //     console.log("TEST:",id,password)
    //     return this.usersService.update(id, password);
    // }

    // @Delete('/:id')
    // async delete(@Param('id') id: number): Promise<any>{
    //     const user= await this.usersService.findOne(id);
    //     if(!user){
    //         throw new NotFoundException("User does not exist!");
    //     }
    //     return this.usersService.delete(id);
    // }
}