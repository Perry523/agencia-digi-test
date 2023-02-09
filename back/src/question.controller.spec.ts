import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './question.controller';
import { QuestionsService } from './question.service';
import { getQuestions } from 'fakeDatabase';
describe('AppController', () => {
  let appController: QuestionsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService],
    }).compile();

    appController = app.get<QuestionsController>(QuestionsController);
  });

  describe('root', () => {
    it('should return an array of questions', () => {
      expect(appController.getQuestions()).toBe(getQuestions);
    });
  });
});
