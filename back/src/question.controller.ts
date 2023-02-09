import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from './question.service';
import { Question } from 'models/question';
@Controller('questions')
export class QuestionsController {
  constructor(private readonly appService: QuestionsService) {}

  @Get()
  getQuestions(): Array<Question> {
    return this.appService.getQuestions();
  }
}
