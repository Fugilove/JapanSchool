<template>
    <div class="basic-phrases">
      <h2>Базовые фразы на японском языке</h2>
      <div v-for="phrase in phrases" :key="phrase.id" class="phrase-card">
        <p class="japanese">{{ phrase.japanese }}</p>
        <p class="transcription">{{ phrase.transcription }}</p>
        <p class="translation">{{ phrase.translation }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const phrases = [
    { id: 1, japanese: 'こんにちは', transcription: 'Konnichiwa', translation: 'Здравствуйте' },
    { id: 2, japanese: 'ありがとう', transcription: 'Arigatou', translation: 'Спасибо' },
    { id: 3, japanese: 'すみません', transcription: 'Sumimasen', translation: 'Извините' },
    { id: 4, japanese: 'おはようございます', transcription: 'Ohayou gozaimasu', translation: 'Доброе утро' },
    { id: 5, japanese: 'こんばんは', transcription: 'Konbanwa', translation: 'Добрый вечер' },
    { id: 6, japanese: 'はい', transcription: 'Hai', translation: 'Да' },
    { id: 7, japanese: 'いいえ', transcription: 'Iie', translation: 'Нет' },
    { id: 8, japanese: 'お願いします', transcription: 'Onegaishimasu', translation: 'Пожалуйста' },
  ];
  </script>
  
  <style scoped>
  .basic-phrases {
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #d3b572;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
    font-family: 'Noto Sans JP', sans-serif;
  }
  
  h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #4b2e1b;
    text-align: center;
  }
  
  .phrase-card {
    background: #ffffff;
    border: 1px solid #d3b572;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .japanese {
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
  }
  
  .transcription {
    font-size: 1.2em;
    color: #666;
  }
  
  .translation {
    font-size: 1.1em;
    color: #999;
  }
  </style>
  