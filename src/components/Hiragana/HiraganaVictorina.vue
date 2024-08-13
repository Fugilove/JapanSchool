<template>
    <div class="quiz-container">
      <h1>Викторина: Транскрипция Хираганы</h1>
      <p>Выберите правильную транскрипцию для отображаемого символа.</p>
  
      <div v-if="!quizFinished">
        <div class="quiz-question">
          <div class="quiz-symbol">{{ currentSymbol.character }}</div>
          <div class="quiz-options">
            <button v-for="option in options" :key="option" @click="checkAnswer(option)" class="quiz-button">
              {{ option }}
            </button>
          </div>
        </div>
        <div v-if="feedback" :class="{'correct': feedback === 'Правильно!', 'incorrect': feedback === 'Неправильно!'}">
          {{ feedback }}
        </div>
      </div>
  
      <div v-if="quizFinished" class="quiz-finished">
        <h2>Викторина завершена!</h2>
        <p>Вы ответили правильно на {{ correctAnswers }} из {{ totalQuestions }} вопросов.</p>
        <button @click="restartQuiz" class="restart-button">Начать заново</button>
      </div>
    </div>
  </template>
<script setup>
import { ref, computed } from 'vue';

const hiraganaSymbols = [
  { character: 'さ', transcription: 'sa' },
  { character: 'し', transcription: 'shi' },
  { character: 'す', transcription: 'su' },
  { character: 'せ', transcription: 'se' },
  { character: 'そ', transcription: 'so' },
  { character: 'た', transcription: 'ta' },
  { character: 'ち', transcription: 'chi' },
  { character: 'つ', transcription: 'tsu' },
  { character: 'て', transcription: 'te' },
  { character: 'と', transcription: 'to' },
  // Добавьте больше символов по мере необходимости
];

const totalQuestions = 10; // Количество вопросов в викторине
const selectedSymbols = ref([]);
const currentSymbol = ref(null);
const options = ref([]);
const feedback = ref('');
const correctAnswers = ref(0);
const currentQuestionIndex = ref(0);
const quizFinished = ref(false);

const getRandomSymbol = () => {
  const randomIndex = Math.floor(Math.random() * hiraganaSymbols.length);
  return hiraganaSymbols[randomIndex];
};

const generateOptions = (correctAnswer) => {
  const incorrectOptions = [];
  while (incorrectOptions.length < 3) {
    const randomSymbol = getRandomSymbol().transcription;
    if (randomSymbol !== correctAnswer && !incorrectOptions.includes(randomSymbol)) {
      incorrectOptions.push(randomSymbol);
    }
  }
  return [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);
};

const startQuiz = () => {
  selectedSymbols.value = [];
  currentQuestionIndex.value = 0;
  correctAnswers.value = 0;
  quizFinished.value = false;

  for (let i = 0; i < totalQuestions; i++) {
    selectedSymbols.value.push(getRandomSymbol());
  }

  nextQuestion();
};

const nextQuestion = () => {
  if (currentQuestionIndex.value >= totalQuestions) {
    quizFinished.value = true;
    return;
  }

  const symbol = selectedSymbols.value[currentQuestionIndex.value];
  currentSymbol.value = symbol;
  options.value = generateOptions(symbol.transcription);
  feedback.value = '';
};

const checkAnswer = (answer) => {
  if (answer === currentSymbol.value.transcription) {
    feedback.value = 'Правильно!';
    correctAnswers.value++;
  } else {
    feedback.value = 'Неправильно!';
  }

  currentQuestionIndex.value++;
  setTimeout(nextQuestion, 1000); // Переход к следующему вопросу через 1 секунду
};

const restartQuiz = () => {
  startQuiz();
};

// Запуск викторины при загрузке компонента
startQuiz();
</script>
<style scoped>
.quiz-container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: 'Noto Sans JP', sans-serif;
}

.quiz-container h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #4b2e1b;
}

.quiz-container p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #3e2723;
}

.quiz-question {
  text-align: center;
}

.quiz-symbol {
  font-size: 3em;
  margin-bottom: 20px;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quiz-button {
  background-color: #8e7d5b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2em;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quiz-button:hover {
  background-color: #7a6d53;
}

.correct {
  color: #4caf50;
  font-weight: bold;
}

.incorrect {
  color: #f44336;
  font-weight: bold;
}

.quiz-finished {
  text-align: center;
}

.restart-button {
  background-color: #8e7d5b;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2em;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.restart-button:hover {
  background-color: #7a6d53;
}
</style>
  