<template>
    <div class="katakana-draw-lesson">
      <h2>{{ title }}</h2>
      <div class="lesson-content">
        <div class="symbol-display">
          <p>Попробуйте нарисовать этот символ:</p>
          <div class="symbol">{{ currentSymbol }}</div>
        </div>
        <div class="drawing-area">
          <canvas ref="drawingCanvas" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="draw" @mouseleave="stopDrawing" />
        </div>
        <div class="controls">
          <button @click="checkDrawing" class="button">Проверить</button>
          <button @click="clearCanvas" class="button">Очистить</button>
        </div>
      </div>
      <p v-if="feedback" class="feedback">{{ feedback }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Заголовок и символы Катаканы
  const title = 'Урок Катакана: Нарисуйте символ';
  const symbols = ['ア', 'イ', 'ウ', 'エ', 'オ'];
  const currentSymbolIndex = ref(0);
  const currentSymbol = ref(symbols[currentSymbolIndex.value]);
  
  // Canvas для рисования
  const drawingCanvas = ref(null);
  const ctx = ref(null);
  const isDrawing = ref(false);
  const userDrawing = ref([]); // Массив для хранения точек рисования
  
  // Инициализация canvas
  onMounted(() => {
    ctx.value = drawingCanvas.value.getContext('2d');
    drawingCanvas.value.width = 400;
    drawingCanvas.value.height = 400;
    ctx.value.strokeStyle = '#000';
    ctx.value.lineWidth = 4;
    ctx.value.lineCap = 'round';
  });
  
  // Функции рисования
  const startDrawing = (event) => {
    isDrawing.value = true;
    userDrawing.value = []; // Очищаем старые точки
    ctx.value.beginPath();
    ctx.value.moveTo(event.offsetX, event.offsetY);
    userDrawing.value.push({ x: event.offsetX, y: event.offsetY });
  };
  
  const draw = (event) => {
    if (!isDrawing.value) return;
    ctx.value.lineTo(event.offsetX, event.offsetY);
    ctx.value.stroke();
    userDrawing.value.push({ x: event.offsetX, y: event.offsetY });
  };
  
  const stopDrawing = () => {
    isDrawing.value = false;
    ctx.value.closePath();
  };
  
  // Очистка canvas
  const clearCanvas = () => {
    ctx.value.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height);
    userDrawing.value = [];
  };
  
  // Функция для проверки правильности рисунка
  const isDrawingCorrect = (userDrawing, targetContour) => {
    const maxDeviation = 300; // Допустимая погрешность в пикселях
  
    // 1. Сравнение количества точек
    if (userDrawing.length !== targetContour.length) {
      return false;
    }
  
    // 2. Проверка расстояний между точками
    for (let i = 0; i < userDrawing.length; i++) {
      const userPoint = userDrawing[i];
      const targetPoint = targetContour[i];
  
      const distance = Math.sqrt(
        Math.pow(userPoint.x - targetPoint.x, 2) +
        Math.pow(userPoint.y - targetPoint.y, 2)
      );
  
      if (distance > maxDeviation) {
        return false; 
      }
    }
  
    return true;
  };
  
  // Эталонные контуры для символов
  const symbolContours = {
    'ア': [{ x: 50, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 50 }],
    'イ': [{ x: 60, y: 40 }, { x: 110, y: 90 }, { x: 160, y: 40 }],
    'ウ': [{ x: 70, y: 30 }, { x: 120, y: 80 }, { x: 170, y: 30 }],
    'エ': [{ x: 80, y: 20 }, { x: 130, y: 70 }, { x: 180, y: 20 }],
    'オ': [{ x: 90, y: 10 }, { x: 140, y: 60 }, { x: 190, y: 10 }]
  };
  
  const feedback = ref('');
  
  // Проверка правильности и переход к следующему символу
  const checkDrawing = () => {
    const targetSymbol = currentSymbol.value;
    const targetContour = symbolContours[targetSymbol];
    const luck = Math.random();
  
    if (isDrawingCorrect(userDrawing.value, targetContour)) {
      if (luck > 0.3) {
        feedback.value = 'Отлично! Переход к следующему символу.';
        moveToNextSymbol();
      } else {
        feedback.value = 'Рисунок правильный, но удача не на вашей стороне. Попробуйте ещё раз!';
        moveToNextSymbol();
      }
    } else {
      feedback.value = 'Неплохо попробуй следующий!';
      moveToNextSymbol();
    }
  };
  
  // Переход к следующему символу
  const moveToNextSymbol = () => {
    if (currentSymbolIndex.value < symbols.length - 1) {
      currentSymbolIndex.value += 1;
      currentSymbol.value = symbols[currentSymbolIndex.value];
      clearCanvas();
    } else {
      feedback.value = 'Поздравляем! Вы завершили все символы!';
    }
  };
  </script>
  
  <style scoped>
  .katakana-draw-lesson {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f5f5dc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin: auto;
    font-family: 'Noto Sans JP', sans-serif;
  }
  
  h2 {
    font-size: 2em;
    color: #4b2e1b;
  }
  
  .lesson-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .symbol-display {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .symbol {
    font-size: 4em;
    color: #3e2723;
  }
  
  .drawing-area {
    border: 2px solid #d3b572;
    border-radius: 10px;
    background-color: #fff;
  }
  
  canvas {
    display: block;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 auto;
  }
  
  .controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
  
  .button {
    padding: 10px 20px;
    font-size: 1.2em;
    color: #fff;
    background-color: #8e7d5b;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #7a6d53;
  }
  
  .feedback {
    margin-top: 20px;
    font-size: 1.2em;
    color: #4b2e1b;
  }
  </style>
  