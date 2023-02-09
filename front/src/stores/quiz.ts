import { Question } from 'app/models/question';
import { defineStore } from 'pinia';
function getRandomPosition() {
  return Math.floor(Math.random() * 4);
}
export const useQuiz = defineStore('quiz', {
  state: () => ({
    questions: [] as Array<Question>,
    currentQuestionIndex: 0,
  }),
  getters: {
    currentQuestionNumber: (state) => state.currentQuestionIndex + 1,
  },
  actions: {
    mountQuiz(payload: Array<Question>) {
      const mountedQuiz = payload.map((currentQuestion) => {
        const answers = [...currentQuestion.incorrect_answers];
        currentQuestion.category = decodeURIComponent(currentQuestion.category);
        currentQuestion.question = decodeURIComponent(currentQuestion.question);
        currentQuestion.correct_answer = decodeURIComponent(
          currentQuestion.correct_answer
        );
        answers.splice(getRandomPosition(), 0, currentQuestion.correct_answer);
        const formatedAnswers = answers.map((currentAsnwer) =>
          decodeURIComponent(currentAsnwer)
        );
        return {
          ...currentQuestion,
          answers: formatedAnswers,
          selectedAnswer: undefined,
        };
      });
      this.questions = mountedQuiz;
    },
  },
});
