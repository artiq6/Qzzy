import {IsOptional, IsString} from "class-validator";
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

export class EditQuestionDto{
    @IsString()
    @IsOptional()
    question: string;

    @IsString()
    @IsOptional()
    a: string;

    @IsString()
    @IsOptional()
    b: string;

    @IsString()
    @IsOptional()
    c: string;

    @IsString()
    @IsOptional()
    d: string;

    @IsString()
    @IsOptional()
    correct: string;
}