import { NestFactory } from '@nestjs/core';
import { QuestionModule } from './question.module';

async function bootstrap() {
  const app = await NestFactory.create(QuestionModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
