import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersData } from 'src/interfaces/user-data';

@Controller('users')
export class UsersController {

    @Get('/')
    getUsers(): UsersData{
        return{
            id: 1,
            name: 'Artur',
            surname: 'Haluch',
            mail: 'ahaluch@mail.to',
            password: '$#$#$hash',
        }
    }

    @Get('/hello/:name/:surname')
    sayHello(
        @Param('name') name: string,
        @Param('surname') surname: string,
    ){
        return `Hello, ${name} ${surname}`
    }

}