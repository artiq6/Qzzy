import { IsNotEmpty } from "class-validator";

export class EditUserPasswordDto{
    @IsNotEmpty()
    password: string
}