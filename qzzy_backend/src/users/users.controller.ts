import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserPasswordDto } from './dtos/user.dto';
import { User } from './user.entity';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('/')
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException("User with id does not exist!")
        } else {
            return user;
        }
    }

    @Post('/register')
    async register(@Body() user: CreateUserDto) {
        return this.usersService.register(user);
    }

    //update user
    @Put('/passwordedit/:id')
    async update(@Param('id') id: number, @Body() password:EditUserPasswordDto ): Promise<any> {
        console.log("TEST:",id,password)
        return this.usersService.update(id, password);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<any>{
        const user= await this.usersService.findOne(id);
        if(!user){
            throw new NotFoundException("User does not exist!");
        }
        return this.usersService.delete(id);
    }
    // @Post('/')
    // addUser(@Body() body: CreateUserDto){
    //     return this.usersService.addUser(body.email,body.login,body.password)
    // }


    // @Delete('/:id')
    // @HttpCode(204)
    // removeUser(@Param('id') id: string){
    //     return this.usersService.removeById(parseInt(id));
    // }


    // @Patch('/:id')
    // editUser(@Body() body: EditUserPasswordDto, @Param('id')id: string){
    //     console.log(body)
    //     return this.usersService.editUserPassword(parseInt(id), body.password)
    // }


    @Get('/hello/:name/:surname')
    sayHello(
        @Param('name') name: string,
        @Param('surname') surname: string,
    ) {
        return `Hello, ${name} ${surname}`
    }


}