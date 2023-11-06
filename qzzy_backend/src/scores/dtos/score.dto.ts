import {IsNumber} from "class-validator";
export class CreatScoreDto{
    @IsNumber()
    user_id: number;

    @IsNumber()
    quiz_id: number;

    @IsNumber()
    correct_answers: number;

    @IsNumber()
    all_answers: number;
}