import {IsString, IsOptional} from "class-validator";
export class CreateQuizDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    img_url?: string;
}