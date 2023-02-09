import { Injectable } from '@nestjs/common';
import { getQuestions } from 'fakeDatabase';
import { Question } from 'models/question';
@Injectable()
export class QuestionsService {
  getQuestions(): Array<Question> {
    return getQuestions();
  }
}
