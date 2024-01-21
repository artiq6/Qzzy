import { Module } from "@nestjs/common";
import { QuizzesController } from "./quizzes.controller";
import { QuizzesService } from "./quizzes.service";
import { QuestionController } from "../questions/questions.controller";
import { QuestionService } from "../questions/questions.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from "./quiz.entity";
import { Question } from "../questions/question.entity";
import { Score } from "../scores/score.entity"
import { ScoresService } from "src/scores/scores.service";
import { ScoresController } from "src/scores/scores.controller";
import { Tag } from "./tags.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Quiz, Question, Tag, Score]),],
    controllers: [QuizzesController, QuestionController, ScoresController],
    providers: [QuizzesService, QuestionService, ScoresService],
})
export class QuizzesModule {}
