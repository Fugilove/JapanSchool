<template>
  <div class="game-container">
    <h1>Изучение Хираганы: Сопоставление слов</h1>
    <p>Перетащите слова на их транскрипции.</p>

    <div class="game-board">
      <div class="word-list">
        <h2>Слова</h2>
        <div
          v-for="word in words"
          :key="word.transcription"
          class="word-card"
          :data-transcription="word.transcription"
          draggable="true"
          @dragstart="handleDragStart"
        >
          {{ word.character }} - {{ word.word }}
        </div>
      </div>

      <div class="transcription-list">
        <h2>Транскрипции</h2>
        <div
          v-for="transcription in transcriptions"
          :key="transcription"
          class="transcription-card"
          @drop="handleDrop"
          @dragover="handleDragOver"
          :data-transcription="transcription"
        >
          {{ transcription }}
        </div>
      </div>
    </div>

    <!-- Кнопка "Узнать перевод" -->
    <button v-if="allWordsMatched" @click="openModal" class="reveal-button">
      Узнать перевод
    </button>

    <!-- Модальное окно -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>Переводы и Хокку</h2>
        <div v-for="word in words" :key="word.transcription">
          <p><strong>{{ word.character }}</strong> - {{ word.translation }}</p>
          <p><strong>Хокку:</strong></p>
          <p>{{ word.haiku }}</p>
          <hr>
        </div>
        <button @click="closeModal" class="modal-close-button">Закрыть</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

// Список слов и транскрипций
const words = ref([
  { character: 'さくら', word: 'sakura', transcription: 'sakura', translation: 'вишня', haiku: 'Вишневый цвет,\nПоток ветра и весна,\nВишневый сад.' },
  { character: 'さけ', word: 'sake', transcription: 'sake', translation: 'лосось', haiku: 'Лосось плывет,\nВ прозрачной воде течет,\nСвет веселья.' },
  { character: 'ねこ', word: 'neko', transcription: 'neko', translation: 'кот', haiku: 'Мягкий котик,\nНа подушке спит спокойно,\nСон о весне.' },
  { character: 'いぬ', word: 'inu', transcription: 'inu', translation: 'собака', haiku: 'Собака лает,\nЗабота о своих друзьях,\nСердце верное.' },
]);

const transcriptions = ref(words.value.map(word => word.transcription));

// Переменные состояния
const isModalOpen = ref(false);
const allWordsMatched = ref(false);
let matchedCount = ref(0);

// Перетаскивание и сброс
const handleDragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.dataset.transcription);
  event.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (event) => {
  event.preventDefault();
  const wordTranscription = event.dataTransfer.getData('text/plain');
  const transcription = event.target.dataset.transcription;
  const word = words.value.find(w => w.transcription === wordTranscription);

  // Проверяем совпадение транскрипции
  if (word && word.transcription === transcription) {
    mergeBlocks(event.target, word);
    matchedCount.value++;
    if (matchedCount.value === words.value.length) {
      allWordsMatched.value = true;
    }
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

// Объединение блоков
const mergeBlocks = (target, word) => {
  target.innerHTML = `${word.character} - ${word.word}`;
  target.classList.add('merged');
};

// Открытие модального окна
const openModal = () => {
  isModalOpen.value = true;
};

// Закрытие модального окна
const closeModal = () => {
  isModalOpen.value = false;
};

// Перемешивание массива
onMounted(() => {
  words.value = shuffleArray(words.value);
  transcriptions.value = shuffleArray(transcriptions.value);
});

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
</script>
<style scoped>
.game-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: 'Noto Sans JP', sans-serif;
}

.game-container h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #4b2e1b;
}

.game-container p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #3e2723;
}

.game-board {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.word-list, .transcription-list {
  flex: 1;
}

.word-card, .transcription-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.word-card {
  background-color: #e3f2fd;
}

.transcription-card {
  background-color: #ffeb3b;
}

.transcription-card:hover {
  background-color: #fdd835;
}

.transcription-card.merged {
  background-color: #a5d6a7;
  color: #fff;
  cursor: default;
}

/* Кнопка "Узнать перевод" */
.reveal-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #8e7d5b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reveal-button:hover {
  background-color: #7a6d53;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: scale-up 0.3s ease;
}

.modal-content button {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #8e7d5b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #7a6d53;
}

@keyframes scale-up {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
