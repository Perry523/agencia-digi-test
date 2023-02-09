<template>
  <q-page class="q-pa-lg quiz-bg">
    <template v-if="loaded && !isFinished">
      <div class="text-primary text-h6 text-bold q-mb-lg">Quiz</div>
      <q-linear-progress
        :value="progress"
        rounded
        color="primary"
        track-color="blue-grey-3"
        size="lg"
        class="q-mb-sm"
      />
      <div class="text-body1 text-grey-8 q-mb">
        Question {{ quiz.currentQuestionNumber }} of
        {{ quiz.questions.length }}
      </div>

      <div class="text-primary text-h6 text-bold q-mt-md">
        Question {{ quiz.currentQuestionNumber }}
      </div>
      <div class="text-caption text-grey-8">
        Category: {{ currentQuestion.category }} -
        {{ currentQuestion.difficulty }}
      </div>
      <div class="text-body1 q-mt-sm">
        {{ currentQuestion.question }}
      </div>
      <q-list class="q-mt-sm ml-n8">
        <q-item
          v-for="(answer, i) in currentQuestion.answers"
          :key="i"
          tag="label"
          class="q-px-none"
          v-ripple
          dense
        >
          <q-item-section avatar>
            <q-radio v-model="currentQuestion.selectedAnswer" :val="answer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ answer }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="row q-mt-md rounded-bordered-buttons">
        <q-btn
          v-if="quiz.currentQuestionIndex !== 0"
          color="blue-grey"
          class="q-px-lg q-py-sm q-mr-md"
          no-caps
          @click="quiz.currentQuestionIndex--"
          >Back</q-btn
        >
        <q-btn
          v-if="quiz.currentQuestionNumber === quiz.questions.length"
          color="primary"
          class="q-px-lg q-py-sm q-ml-md"
          no-caps
          @click="finishQuiz"
          >Finish</q-btn
        >
        <q-btn
          v-else
          @click="quiz.currentQuestionIndex++"
          :disable="!currentQuestion.selectedAnswer"
          class="q-px-lg q-py-sm"
          no-caps
          color="primary"
          >Next</q-btn
        >
      </div>
    </template>
    <div v-else-if="isFinished" class="text-h6 text-center">
      <div>Your result was</div>
      <div class="q-mt-md">{{ score }}</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Loading } from 'quasar';
import { useQuiz } from 'stores/quiz';
import { api } from 'src/boot/axios';
const loaded = ref(false);
const isFinished = ref(false);
const quiz = useQuiz();
const score = ref('');
onMounted(async () => {
  Loading.show();
  const { data } = await api('/questions');
  quiz.mountQuiz(data);
  Loading.hide();
  loaded.value = true;
});
const progress = computed(() => {
  return quiz.currentQuestionNumber / quiz.questions.length;
});
const currentQuestion = computed(() => {
  return quiz.questions[quiz.currentQuestionIndex] || {};
});
function finishQuiz() {
  const hits = quiz.questions.filter(
    (question) => question.selectedAnswer == question.correct_answer
  );
  const percentageHits = (hits.length / quiz.questions.length) * 100;
  isFinished.value = true;
  score.value = `${percentageHits}%`;
}
</script>
<style lang="scss">
.quiz-bg {
  background: #f5f1e5;
}
.ml-n8 {
  margin-left: -8px;
}
.rounded-bordered-buttons {
  button {
    border-radius: 10px;
  }
}
</style>
