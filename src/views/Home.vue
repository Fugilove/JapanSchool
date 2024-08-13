<template>
    <div class="home">
      <div v-if="showJapanese" class="typing-container">
        <p class="handwritten" ref="textElement">{{ currentJapaneseText }}</p>
      </div>
      <div v-else class="handwritten">
        <h1>{{ russianTexts.heading }}</h1>
        <p>{{ russianTexts.description }}</p>
        <ul>
          <li v-for="(item, index) in russianTexts.list" :key="index">{{ item }}</li>
        </ul>
        <p>{{ russianTexts.conclusion }}</p>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  
  // Japanese text to display
  const japaneseText = `日本語のコースへようこそ！このサイトは、日本語をゼロから学びたい方や、スキルを向上させたい方のためのものです。日本語の基本的な側面をカバーする構造的で楽しい学習を提供します。ヒラガナ、カタカナ、漢字を学ぶことで、日本語の読み書き、基本的なテキストの理解、簡単な会話ができるようになります。`;
  
  // Russian translations
  const russianTexts = {
    heading: 'Добро пожаловать на курс японского языка!',
    description: 'Этот сайт предназначен для всех, кто хочет изучать японский язык с нуля или улучшить свои знания.',
    list: [
      'Хирагана: Освойте одну из двух основных слоговых азбук.',
      'Катакана: Изучите вторую слоговую азбуку, используемую для иностранных слов.',
      'Кандзи: Погрузитесь в изучение иероглифов, используемых в японской письменности.'
    ],
    conclusion: 'К концу курса вы будете уверенно читать и писать на японском, понимать базовые текстовые материалы и общаться на простые темы.'
  };
  
  const showJapanese = ref(true);
  const currentJapaneseText = ref(japaneseText);
  
  // Function to dynamically replace Japanese text with Russian text
  const replaceTextWithRussian = () => {
    showJapanese.value = false;
  };
  
  // Simulate typing effect
  const simulateTyping = () => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < japaneseText.length) {
        currentJapaneseText.value = japaneseText.slice(0, index + 1);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(replaceTextWithRussian, 1000); // Wait before replacing text
      }
    }, 100); // Speed of typing effect
  };
  
  onMounted(() => {
    simulateTyping();
  });
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 20px;
    background: #f5f5dc; /* Цвет, напоминающий пергамент */
    border: 1px solid #d3b572; /* Рамка для эффекта пергамента */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: auto;
    font-family: 'Noto Sans JP', cursive; /* Японский шрифт для рукописного эффекта */
    position: relative;
    overflow: hidden;
  }
  
  .handwritten {
    display: inline-block;
    position: relative;
    overflow: hidden;
    white-space: pre-wrap;
    font-size: 1.2em;
    line-height: 1.6;
    color: #3e2723; /* Темный цвет текста */
    font-family: 'Noto Sans JP', cursive; /* Шрифт для рукописного стиля */
  }
  
  .typing-container {
    position: relative;
  }
  
  .typing-container p {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  
  @keyframes typing {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 100%;
      opacity: 1;
    }
  }
  
  h1, p, ul {
    position: relative;
    display: inline-block;
    animation: typing 4s steps(60, end) 1s both;
  }
  
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #4b2e1b; /* Цвет, напоминающий чернила */
  }
  
  p, ul {
    font-size: 1.2em;
    margin: 20px 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
    display: inline-block;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .start-button {
    display: inline-block;
    padding: 15px 25px;
    font-size: 1.2em;
    color: #fff;
    background-color: #8e7d5b; /* Цвет кнопок, напоминающий японский бумажный цвет */
    border: none;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .start-button:hover {
    background-color: #7a6d53; /* Более темный оттенок при наведении */
  }
  </style>
  