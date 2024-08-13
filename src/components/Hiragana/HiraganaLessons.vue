<template>
    <div class="hiragana-lessons">
      <h1>Уроки Хираганы</h1>
      <p>Хирагана — одна из основных японских азбук. Она используется для записи японских слов и грамматических элементов. В этом уроке мы рассмотрим основные символы хираганы.</p>
      
      <div class="hiragana-container">
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
    </div>
  
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>{{ selectedSymbol.character }}</h2>
          <p><strong>Транскрипция:</strong> {{ selectedSymbol.transcription }}</p>
          <p><strong>Примеры слов:</strong> {{ selectedSymbol.examples.join(', ') }}</p>
          <button @click="closeModal" class="modal-close-button">Закрыть</button>
        </div>
        <div class="petal-animation" v-if="isModalOpen"></div>
      </div>
      
      <div class="hiragana-exercise">
        <h2>Упражнение</h2>
        <p>Попробуйте запомнить символы хираганы и их транскрипцию. Чтобы улучшить знание, повторяйте их вслух и пишите их вручную.</p>
        <p>В следующем уроке мы рассмотрим катакану и как она отличается от хираганы.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  
  const hiraganaSymbols = [
  { character: 'あ', transcription: 'a', examples: ['あさ (утро)', 'あめ (дождь)'] },
  { character: 'い', transcription: 'i', examples: ['いえ (дом)', 'いぬ (собака)'] },
  { character: 'う', transcription: 'u', examples: ['うみ (море)', 'うえ (верх)'] },
  { character: 'え', transcription: 'e', examples: ['えき (станция)', 'えん (йена)'] },
  { character: 'お', transcription: 'o', examples: ['おかね (деньги)', 'おちゃ (чай)'] },
  { character: 'か', transcription: 'ka', examples: ['かわ (река)', 'かさ (зонт)'] },
  { character: 'き', transcription: 'ki', examples: ['き (дерево)', 'きん (золото)'] },
  { character: 'く', transcription: 'ku', examples: ['くるま (машина)', 'くうき (воздух)'] },
  { character: 'け', transcription: 'ke', examples: ['けいさつ (полиция)', 'けん (провинция)'] },
  { character: 'こ', transcription: 'ko', examples: ['こども (ребёнок)', 'こい (любовь)'] },
  { character: 'さ', transcription: 'sa', examples: ['さくら (вишня)', 'さとう (сахар)'] },
  { character: 'し', transcription: 'shi', examples: ['しろ (белый)', 'しん (новый)'] },
  { character: 'す', transcription: 'su', examples: ['すし (суши)', 'すいか (арбуз)'] },
  { character: 'せ', transcription: 'se', examples: ['せんせい (учитель)', 'せいかつ (жизнь)'] },
  { character: 'そ', transcription: 'so', examples: ['そら (небо)', 'そくたつ (экспресс-почта)'] },
  { character: 'た', transcription: 'ta', examples: ['たまご (яйцо)', 'たけ (бамбук)'] },
  { character: 'ち', transcription: 'chi', examples: ['ちいさい (маленький)', 'ちず (карта)'] },
  { character: 'つ', transcription: 'tsu', examples: ['つき (луна)', 'つくえ (стол)'] },
  { character: 'て', transcription: 'te', examples: ['てんき (погода)', 'てがみ (письмо)'] },
  { character: 'と', transcription: 'to', examples: ['ともだち (друг)', 'とけい (часы)'] },
  { character: 'な', transcription: 'na', examples: ['なつ (лето)', 'ながい (длинный)'] },
  { character: 'に', transcription: 'ni', examples: ['にんぎょう (кукла)', 'にほん (Япония)'] },
  { character: 'ぬ', transcription: 'nu', examples: ['ぬの (ткань)', 'ぬいぐるみ (плюшевый медведь)'] },
  { character: 'ね', transcription: 'ne', examples: ['ねこ (кошка)', 'ねつ (жар)'] },
  { character: 'の', transcription: 'no', examples: ['のり (водоросли)', 'のんびり (спокойный)'] },
  { character: 'は', transcription: 'ha', examples: ['はな (цветок)', 'はやい (быстрый)'] },
  { character: 'ひ', transcription: 'hi', examples: ['ひこうき (самолёт)', 'ひと (человек)'] },
  { character: 'ふ', transcription: 'fu', examples: ['ふね (корабль)', 'ふゆ (зима)'] },
  { character: 'へ', transcription: 'he', examples: ['へや (комната)', 'へん (странный)'] },
  { character: 'ほ', transcription: 'ho', examples: ['ほし (звезда)', 'ほん (книга)'] },
  { character: 'ま', transcription: 'ma', examples: ['まち (город)', 'まめ (боб)'] },
  { character: 'み', transcription: 'mi', examples: ['みず (вода)', 'みせ (магазин)'] },
  { character: 'む', transcription: 'mu', examples: ['むし (насекомое)', 'むね (грудь)'] },
  { character: 'め', transcription: 'me', examples: ['めがね (очки)', 'めし (еда)'] },
  { character: 'も', transcription: 'mo', examples: ['もり (лес)', 'もも (персик)'] },
  { character: 'や', transcription: 'ya', examples: ['やま (гора)', 'やさい (овощи)'] },
  { character: 'ゆ', transcription: 'yu', examples: ['ゆき (снег)', 'ゆうびんきょく (почта)'] },
  { character: 'よ', transcription: 'yo', examples: ['よる (ночь)', 'よてい (план)'] },
  { character: 'ら', transcription: 'ra', examples: ['らいねん (следующий год)', 'らく (легкий)'] },
  { character: 'り', transcription: 'ri', examples: ['りんご (яблоко)', 'りょうり (блюдо)'] },
  { character: 'る', transcription: 'ru', examples: ['るす (отсутствие)', 'るい (вид)'] },
  { character: 'れ', transcription: 're', examples: ['れいぞうこ (холодильник)', 'れんしゅう (упражнение)'] },
  { character: 'ろ', transcription: 'ro', examples: ['ろうそく (свеча)', 'ろく (шесть)'] },
  { character: 'わ', transcription: 'wa', examples: ['わたし (я)', 'わに (крокодил)'] },
  { character: 'を', transcription: 'wo', examples: ['を (частица)'] }, // используется только в качестве частицы
  { character: 'ん', transcription: 'n', examples: ['ん (мягкий носовой звук)'] }, // используется как самостоятельный звук
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
    color: #4b2e1b; /* Тёмный цвет текста */
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
    transition: transform 0.3s;
    cursor: pointer;
  }
  
  .hiragana-card:hover {
    transform: scale(1.1);
  }
  
  .hiragana-symbol {
    font-size: 2em;
    margin-bottom: 5px;
  }
  
  .hiragana-transcription {
    font-size: 1.2em;
    color: #6d4c41; /* Цвет текста для транскрипции */
  }
  
  .hiragana-exercise {
    margin-top: 30px;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 500px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .modal-close-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #8e7d5b; /* Цвет кнопок, напоминающий японский бумажный цвет */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .modal-close-button:hover {
    background-color: #7a6d53; /* Более темный оттенок при наведении */
  }
  
  .petal-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: transparent;
  }
  
  .petal-animation::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 192, 203, 0.8) 0%, rgba(255, 192, 203, 0) 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: petal-explosion 1s ease-out;
  }
  
  @keyframes petal-explosion {
    0% {
      transform: scale(0) translate(-50%, -50%);
      opacity: 1;
    }
    100% {
      transform: scale(3) translate(-50%, -50%);
      opacity: 0;
    }
  }
  </style>
  