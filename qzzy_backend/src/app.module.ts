import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Question } from './questions/question.entity';
import { Quiz } from './quizzes/quiz.entity';
import { Tag } from './quizzes/tags.entity';
import { Score } from './scores/score.entity';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import { UserData } from './users/user-data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      password: 'nestJ$',
      username: 'nest',
      database: 'qzzy',
      synchronize: true,
      logging: true,
      entities: [User,UserData,Quiz,Question,Tag,Score],
    }),
    UsersModule, 
    QuizzesModule, 
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
