<template>
    <div class="quiz-container">
      <h1>Закрепление Знаний: Викторина</h1>
  
      <!-- Вопрос и варианты ответов -->
      <div v-if="!quizFinished">
        <p>{{ currentQuestion.question }}</p>
  
        <div class="options">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index" 
            @click="checkAnswer(option)"
            :class="{ correct: showAnswer && option === currentQuestion.correctAnswer, incorrect: showAnswer && option !== currentQuestion.correctAnswer && option === selectedAnswer }"
          >
            {{ option }}
          </button>
        </div>
      </div>
  
      <!-- Результаты -->
      <div v-else class="result">
        <h2>Викторина завершена!</h2>
        <p>Ваш результат: {{ score }} из {{ quizQuestions.length }}</p>
        <p>{{ feedbackMessage }}</p>
        <button @click="restartQuiz">Попробовать еще раз</button>
      </div>
    </div>
  </template>
<script setup>
import { ref, computed } from 'vue';

// Список слов для викторины
const words = [
  { character: 'さくら', transcription: 'sakura', translation: 'вишня' },
  { character: 'さけ', transcription: 'sake', translation: 'лосось' },
  { character: 'ねこ', transcription: 'neko', translation: 'кот' },
  { character: 'いぬ', transcription: 'inu', translation: 'собака' },
];

// Функция перемешивания массива
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Функция создания вопросов для викторины
const createQuizQuestions = () => {
  const questions = [];

  words.forEach((word) => {
    // Вопрос о переводе слова
    questions.push({
      question: `Как переводится слово "${word.character}" (${word.transcription})?`,
      correctAnswer: word.translation,
      options: shuffleArray([
        word.translation,
        ...shuffleArray(words.filter(w => w !== word)).slice(0, 3).map(w => w.translation),
      ]),
    });

    // Вопрос о транскрипции слова
    questions.push({
      question: `Какова транскрипция слова "${word.character}"?`,
      correctAnswer: word.transcription,
      options: shuffleArray([
        word.transcription,
        ...shuffleArray(words.filter(w => w !== word)).slice(0, 3).map(w => w.transcription),
      ]),
    });
  });

  return shuffleArray(questions);
};

// Состояние викторины
const quizQuestions = ref(createQuizQuestions());
const currentQuestionIndex = ref(0);
const score = ref(0);
const selectedAnswer = ref(null);
const showAnswer = ref(false);

// Текущий вопрос
const currentQuestion = computed(() => quizQuestions.value[currentQuestionIndex.value]);

// Проверка ответа
const checkAnswer = (option) => {
  selectedAnswer.value = option;
  showAnswer.value = true;

  if (option === currentQuestion.value.correctAnswer) {
    score.value++;
  }

  // Переход к следующему вопросу через 1 секунду
  setTimeout(() => {
    if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
      currentQuestionIndex.value++;
      showAnswer.value = false;
      selectedAnswer.value = null;
    } else {
      quizFinished.value = true;
    }
  }, 1000);
};

const quizFinished = ref(false);

// Сообщение обратной связи
const feedbackMessage = computed(() => {
  if (score.value === quizQuestions.value.length) {
    return 'Отличная работа! Вы правильно ответили на все вопросы!';
  } else if (score.value > quizQuestions.value.length / 2) {
    return 'Хороший результат! Но есть ещё над чем поработать.';
  } else {
    return 'Ничего страшного, попробуйте ещё раз, вы всё сможете!';
  }
});

// Перезапуск викторины
const restartQuiz = () => {
  quizQuestions.value = createQuizQuestions();
  currentQuestionIndex.value = 0;
  score.value = 0;
  quizFinished.value = false;
  showAnswer.value = false;
  selectedAnswer.value = null;
};
</script>
<style scoped>
.quiz-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: 'Noto Sans JP', sans-serif;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #4b2e1b;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #3e2723;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px;
  font-size: 1.1em;
  color: #fff;
  background-color: #8e7d5b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #7a6d53;
}

button.correct {
  background-color: #81c784;
}

button.incorrect {
  background-color: #e57373;
}

.result {
  text-align: center;
}

.result h2 {
  font-size: 2em;
  color: #4b2e1b;
}

.result p {
  font-size: 1.2em;
  color: #3e2723;
  margin-top: 20px;
}

.result button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 1.2em;
}
</style>
  