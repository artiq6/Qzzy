import {IsString} from "class-validator";
export class CreateQuestionDto{
    @IsString()
    question: string;

    @IsString()
    a: string;

    @IsString()
    b: string;

    @IsString()
    c: string;

    @IsString()
    d: string;

    @IsString()
    correct: string;
}