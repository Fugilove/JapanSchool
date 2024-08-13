<template>
    <div class="katakana-lesson">
      <h1>Урок по Катакане</h1>
  
      <section class="intro">
        <h2>Что такое Катакана?</h2>
        <p>
          Катакана — одна из двух фонетических азбук японского языка. Она используется для написания заимствованных слов (например, из английского), имен собственных, названий животных, растений и некоторых технических терминов. Катакана также используется для выделения слов в тексте.
        </p>
      </section>
  
      <section class="examples">
        <h2>Примеры слов на Катакане</h2>
        <ul>
          <li>カメラ (Kamera) — Камера</li>
          <li>レストラン (Resutoran) — Ресторан</li>
          <li>タクシー (Takushī) — Такси</li>
          <li>ビール (Bīru) — Пиво</li>
          <li>ゲーム (Gēmu) — Игра</li>
        </ul>
      </section>
  
      <section class="exercises">
        <h2>Упражнения</h2>
  
        <div class="exercise">
          <h3>1. Напишите слово на Катакане</h3>
          <p>Попробуйте написать слово "コンピュータ" (Konpyūta) на Катакане в предоставленной области:</p>
          <textarea v-model="userInput" placeholder="Напишите здесь..."></textarea>
          <button @click="checkAnswer" class="mar-button2">Проверить</button>
          <p v-if="feedback" :class="{ correct: isCorrect, incorrect: !isCorrect }">{{ feedback }}</p>
        </div>
  
        <div class="exercise">
          <h3>2. Распознайте символ</h3>
          <p>Посмотрите на символ ниже и выберите правильный вариант транскрипции:</p>
          <div class="symbol-container">
            <span class="symbol">{{ randomSymbol.character }}</span>
          </div>
          
          <button @click="checkTranscription" class="mar-button">Проверить</button>
          <select v-model="selectedTranscription" class="transcription-select">
            <option v-for="(transcription, index) in transcriptions" :key="index" :value="transcription">{{ transcription }}</option>
          </select>
          <p v-if="transcriptionFeedback" :class="{ correct: transcriptionIsCorrect, incorrect: !transcriptionIsCorrect }">{{ transcriptionFeedback }}</p>
        </div>
      </section>
  
      <section class="quiz">
        <h2>Тест на понимание</h2>
        <p>Выберите правильный ответ:</p>
        <form @submit.prevent="checkQuiz">
          <div class="quiz-question m-2">
            <label>Какой из этих символов используется для написания иностранных слов?</label>
            <select v-model="quizAnswer" class="quiz-select">
              <option value="Hiragana">Хирагана</option>
              <option value="Katakana">Катакана</option>
            </select>
          </div>
          <button type="submit" class="quiz-button">Проверить</button>
          <p v-if="quizFeedback" :class="{ correct: quizIsCorrect, incorrect: !quizIsCorrect }">{{ quizFeedback }}</p>
        </form>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const katakanaItems = [
    { character: "ア", transcription: "A" },
    { character: "イ", transcription: "I" },
    { character: "ウ", transcription: "U" },
    // Добавьте остальные символы
  ];
  
  const userInput = ref('');
  const feedback = ref('');
  const isCorrect = ref(false);
  
  const correctAnswer = 'コンピュータ';
  
  const checkAnswer = () => {
    if (userInput.value.trim() === correctAnswer) {
      feedback.value = 'Правильно! Отлично.';
      isCorrect.value = true;
    } else {
      feedback.value = 'Неправильно. Попробуйте еще раз.';
      isCorrect.value = false;
    }
  };
  
  const randomSymbol = ref(katakanaItems[Math.floor(Math.random() * katakanaItems.length)]);
  const selectedTranscription = ref('');
  const transcriptions = katakanaItems.map(item => item.transcription);
  const transcriptionFeedback = ref('');
  const transcriptionIsCorrect = ref(false);
  
  const checkTranscription = () => {
    const correctTranscription = katakanaItems.find(item => item.character === randomSymbol.value.character).transcription;
    if (selectedTranscription.value === correctTranscription) {
      transcriptionFeedback.value = 'Правильно!';
      transcriptionIsCorrect.value = true;
    } else {
      transcriptionFeedback.value = 'Неправильно. Попробуйте еще раз.';
      transcriptionIsCorrect.value = false;
    }
  };
  
  const quizAnswer = ref('');
  const quizFeedback = ref('');
  const quizIsCorrect = ref(false);
  
  const checkQuiz = () => {
    if (quizAnswer.value === 'Katakana') {
      quizFeedback.value = 'Верно! Катакана используется для написания иностранных слов.';
      quizIsCorrect.value = true;
    } else {
      quizFeedback.value = 'Неправильно. Катакана используется для написания иностранных слов.';
      quizIsCorrect.value = false;
    }
  };
  </script>
  
  <style scoped>
  .katakana-lesson {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    max-width: 800px;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #555;
    border-bottom: 2px solid #e91e63;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
  
  textarea {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
  
  button {
    background-color: #e91e63;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #d81b60;
  }
  
  select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .symbol-container {
    font-size: 64px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  
  .symbol {
    transition: transform 0.3s;
  }
  
  .symbol:hover {
    transform: scale(1.2);
  }
  
  .correct {
    color: green;
    font-weight: bold;
  }
  
  .incorrect {
    color: red;
    font-weight: bold;
  }
  
  .quiz-question {
    margin-bottom: 20px;
  }
  
  .quiz-select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .quiz-button {
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .quiz-button:hover {
    background-color: #1976d2;
  }
  .mar-button{
    margin: 15px;
    margin-left: 4px;
  }
  .mar-button2{
    margin: 15px;
    margin-left: 1px;
  }


  
  </style>
  