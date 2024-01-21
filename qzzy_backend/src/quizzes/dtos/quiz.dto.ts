import {IsString, IsOptional, IsBoolean, IsArray} from "class-validator";
export class CreateQuizDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    img_url: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsArray()
    @IsOptional()
    tags: [];
}

export class EditQuizDto{
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    img_url: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsArray()
    @IsOptional()
    tags: [];
}