import {IsString, IsNotEmpty} from "class-validator";
export class CreateUserDto{
    @IsString()
    mail: string;
    
    @IsString()
    login: string;
    
    @IsString()
    password: string;
}

export class EditUserPasswordDto{
    @IsNotEmpty()
    password: string
}