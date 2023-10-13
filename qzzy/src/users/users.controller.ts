import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/users.dto';
import { EditUserPasswordDto } from './dtos/edit-password-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get('/')
    getUsers(){
        return this.usersService.getUsers();
    }


    @Get('/:id')
    getUser(@Param('id') id: string){
        return this.usersService.getById(parseInt(id));
    }


    @Post('/')
    addUser(@Body() body: CreateUserDto){
        return this.usersService.addUser(body.name,body.surname,body.mail,body.password)
    }


    @Get('/hello/:name/:surname')
    sayHello(
        @Param('name') name: string,
        @Param('surname') surname: string,
    ){
        return `Hello, ${name} ${surname}`
    }

    @Delete('/:id')
    @HttpCode(204)
    removeUser(@Param('id') id: string){
        return this.usersService.removeById(parseInt(id));
    }


    @Patch('/:id')
    editUser(@Body() body: EditUserPasswordDto, @Param('id')id: string){
        console.log(body)
        return this.usersService.editUserPassword(parseInt(id), body.password)
    }


}