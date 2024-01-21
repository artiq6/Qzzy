import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Question } from '../questions/question.entity';
import { CreateQuizDto, EditQuizDto } from './dtos/quiz.dto';
import { Tag } from './tags.entity';

@Injectable()
export class QuizzesService {

    constructor(
        @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
        @InjectDataSource() private dataSource: DataSource
    ) { }

    async findAll(): Promise<Quiz[]> {
        return this.quizRepository.find({
            relations: ['tags'],
        });
    }
    async findAllActive(): Promise<Quiz[]> {
        return this.quizRepository.find({ where: { is_active: true }, relations: ['tags'] });
    }

    async findOne(id: number): Promise<Quiz> {
        return this.quizRepository.findOne({ where: { id }, relations: ['tags'] });
    }

    async add(quizData: Partial<Quiz>): Promise<Quiz> {
        // Dla każdego tagu w quizData.tags
        for (let i = 0; i < quizData.tags.length; i++) {
            quizData.tags[i].name=quizData.tags[i].name.trim()
            let tag = await this.tagRepository.findOne({ where: { name: quizData.tags[i].name } });
            if (!tag) {
                tag = this.tagRepository.create({ name: quizData.tags[i].name });
                await this.tagRepository.save(tag);
            }
            quizData.tags[i] = tag;
        }

        const quiz = this.quizRepository.create(quizData);
        return await this.quizRepository.save(quiz);
    }

    async update(id: number, quizData: Partial<Quiz>): Promise<void> {
        const quiz = await this.findOne(id);

        if (!quiz) {
            throw new NotFoundException(`Quizz o id:${id} nie istnieje`);
        }
        console.log(quizData)
        for (let i = 0; i < quizData.tags.length; i++) {
            quizData.tags[i].name=quizData.tags[i].name.trim()
            let tag = await this.tagRepository.findOne({ where: { name: quizData.tags[i].name } });

            if (!tag) {
                tag = this.tagRepository.create({ name: quizData.tags[i].name });
                await this.tagRepository.save(tag);
            }

            quizData.tags[i] = tag;
        }

        this.quizRepository.merge(quiz, quizData);
        quiz.tags = quizData.tags
        await this.quizRepository.save(quiz);
    }

    async delete(id: number): Promise<void> {
        await this.quizRepository.delete(id);
    }

    async assignTagsToQuiz(quizId: number, tagNames: string[]): Promise<Quiz> {
        const quiz = await this.quizRepository.findOne({
            where: { id: quizId },
            relations: ['tags']
        });
        if (!quiz) {
            throw new NotFoundException('Quiz nie znaleziony');
        }

        const tags: Tag[] = [];

        for (const tagName of tagNames) {
            let tag = await this.tagRepository.findOne({ where: { name: tagName } });

            if (!tag) {
                tag = this.tagRepository.create({ name: tagName });
                tag = await this.tagRepository.save(tag);
            }

            tags.push(tag);
        }

        quiz.tags = [...tags];

        return this.quizRepository.save(quiz);
    }
}