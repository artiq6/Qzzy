import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.entity";
import { UserData } from "./user-data.entity";
@Module({
    imports: [TypeOrmModule.forFeature([User, UserData]),],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
