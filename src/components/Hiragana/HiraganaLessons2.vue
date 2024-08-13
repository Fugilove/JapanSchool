<template>
    <div class="hiragana-lessons">
      <h1>Урок 2: Расширенный список Хираганы</h1>
      <p>В этом уроке мы рассмотрим больше символов хираганы и примеры слов, в которых они используются. Попробуйте запомнить их и увидеть, как они используются в реальных словах.</p>
  
      <div class="hiragana-grid">
        <div 
          class="hiragana-card" 
          v-for="(symbol, index) in hiraganaSymbols" 
          :key="index"
          @click="openModal(symbol)"
        >
          <div class="hiragana-symbol">{{ symbol.character }}</div>
          <div class="hiragana-transcription">{{ symbol.transcription }}</div>
        </div>
      </div>
  
      <!-- Модальное окно -->
      <transition name="modal">
        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <h2>{{ selectedSymbol.character }}</h2>
            <p><strong>Транскрипция:</strong> {{ selectedSymbol.transcription }}</p>
            <p><strong>Примеры слов:</strong> {{ selectedSymbol.examples.join(', ') }}</p>
            <button @click="closeModal" class="modal-close-button">Закрыть</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  
  <script setup>
import { ref } from 'vue';

const hiraganaSymbols = [
  { character: 'きゃ', transcription: 'kya', examples: ['きゃく (гость)', 'きゃん (праздник)'] },
  { character: 'きゅ', transcription: 'kyu', examples: ['きゅうり (огурец)', 'きゅうじつ (выходной день)'] },
  { character: 'きょ', transcription: 'kyo', examples: ['きょう (сегодня)', 'きょく (песня)'] },
  { character: 'しゃ', transcription: 'sha', examples: ['しゃしん (фото)', 'しゃく (мера)'] },
  { character: 'しゅ', transcription: 'shu', examples: ['しゅう (неделя)', 'しゅく (отдых)'] },
  { character: 'しょ', transcription: 'sho', examples: ['しょうゆ (соевый соус)', 'しょうが (имбирь)'] },
  { character: 'ちゃ', transcription: 'cha', examples: ['ちゃわん (чашка)', 'ちゃこ (чайник)'] },
  { character: 'ちゅ', transcription: 'chu', examples: ['ちゅう (середина)', 'ちゅうしゃ (укол)'] },
  { character: 'ちょ', transcription: 'cho', examples: ['ちょうちん (фонарь)', 'ちょう (бабочка)'] },
  { character: 'にゃ', transcription: 'nya', examples: ['にゃんこ (котик)', 'にゃん (мяу)'] },
  { character: 'にゅ', transcription: 'nyu', examples: ['にゅういん (госпиталь)', 'にゅうがく (поступление в школу)'] },
  { character: 'にょ', transcription: 'nyo', examples: ['にょろにょろ (вьющийся)', 'にょろ (веревка)'] },
  { character: 'ひゃ', transcription: 'hya', examples: ['ひゃく (сто)', 'ひゃくえん (сто иен)'] },
  { character: 'ひゅ', transcription: 'hyu', examples: ['ひゅう (свист)', 'ひゅういん (колесо)'] },
  { character: 'ひょ', transcription: 'hyo', examples: ['ひょう (график)', 'ひょうけい (графическое представление)'] },
  { character: 'みゃ', transcription: 'mya', examples: ['みゃく (пульс)', 'みゃくみゃく (пульсирующий)'] },
  { character: 'みゅ', transcription: 'myu', examples: ['みゅう (музыка)', 'みゅうじック (музыка)'] },
  { character: 'みょ', transcription: 'myo', examples: ['みょう (вышивка)', 'みょうい (простое)'] },
  { character: 'りゃ', transcription: 'rya', examples: ['りゃく (сокращение)', 'りゃくしゅ (сокращенная форма)'] },
  { character: 'りゅ', transcription: 'ryu', examples: ['りゅう (дракон)', 'りゅうこう (поток)'] },
  { character: 'りょ', transcription: 'ryo', examples: ['りょうり (кухня)', 'りょうしん (родители)'] },
];

const selectedSymbol = ref(null);
const isModalOpen = ref(false);

const openModal = (symbol) => {
  selectedSymbol.value = symbol;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

  
<style scoped>
.hiragana-lessons {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: 'Noto Sans JP', sans-serif; /* Японский шрифт */
}

.hiragana-lessons h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #4b2e1b; /* Цвет текста заголовка */
}

.hiragana-lessons p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #3e2723; /* Темный цвет текста */
}

.hiragana-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.hiragana-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hiragana-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.hiragana-symbol {
  font-size: 2em;
  margin-bottom: 5px;
}

.hiragana-transcription {
  font-size: 1.2em;
  color: #6d4c41; /* Цвет текста для транскрипции */
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
  background-color: #8e7d5b; /* Цвет кнопки */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #7a6d53; /* Более темный оттенок при наведении */
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

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>

  