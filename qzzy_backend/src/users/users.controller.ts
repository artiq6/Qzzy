import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserPasswordDto } from './dtos/user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.getUser(id);
        if (!user) {
            throw new NotFoundException("User with id does not exist!")
        } else {
            return user;
        }
    }

    @Post('/:id')
    async modifyUser(@Param('id') id: number, @Body() data: Partial<User>) {
        return this.usersService.modifyUser(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/email')
    async findByEmail(@Body() data: any){
        const user = await this.usersService.findOneByEmail(data.mail)
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
    @UseGuards(JwtAuthGuard)
    @Put('/passwordedit/:id')
    async update(@Param('id') id: number, @Body() password:EditUserPasswordDto ): Promise<any> {
        console.log("TEST:",id,password)
        return this.usersService.update(id, password);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<any>{
        const user= await this.usersService.findOne(id);
        if(!user){
            throw new NotFoundException("User does not exist!");
        }
        return this.usersService.delete(id);
    }
}