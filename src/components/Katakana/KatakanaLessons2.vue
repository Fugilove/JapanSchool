<template>
    <div class="katakana-grid">
      <h1>Азбука Катакана</h1>
      <div class="grid-container">
        <div 
          v-for="(item, index) in katakanaItems" 
          :key="index" 
          class="grid-item"
          @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          :class="{ 'zoomed': hoveredIndex === index }"
        >
          <span class="character">{{ item.character }}</span>
          <span v-if="hoveredIndex === index" class="transcription">{{ item.transcription }}</span>
        </div>
      </div>
  
      <div class="examples">
        <h2>Примеры слов с использованием Катаканы</h2>
        <ul>
          <li>コンピュータ (Konpyūta) — Компьютер</li>
          <li>テレビ (Terebi) — Телевизор</li>
          <li>バナナ (Banana) — Банан</li>
          <li>コーヒー (Kōhī) — Кофе</li>
          <li>パン (Pan) — Хлеб</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const katakanaItems = ref([
    { character: "ア", transcription: "A" },
    { character: "イ", transcription: "I" },
    { character: "ウ", transcription: "U" },
    { character: "エ", transcription: "E" },
    { character: "オ", transcription: "O" },
    { character: "カ", transcription: "Ka" },
    { character: "キ", transcription: "Ki" },
    { character: "ク", transcription: "Ku" },
    { character: "ケ", transcription: "Ke" },
    { character: "コ", transcription: "Ko" },
    { character: "サ", transcription: "Sa" },
    { character: "シ", transcription: "Shi" },
    { character: "ス", transcription: "Su" },
    { character: "セ", transcription: "Se" },
    { character: "ソ", transcription: "So" },
    { character: "タ", transcription: "Ta" },
    { character: "チ", transcription: "Chi" },
    { character: "ツ", transcription: "Tsu" },
    { character: "テ", transcription: "Te" },
    { character: "ト", transcription: "To" },
    { character: "ナ", transcription: "Na" },
    { character: "ニ", transcription: "Ni" },
    { character: "ヌ", transcription: "Nu" },
    { character: "ネ", transcription: "Ne" },
    { character: "ノ", transcription: "No" },
    { character: "ハ", transcription: "Ha" },
    { character: "ヒ", transcription: "Hi" },
    { character: "フ", transcription: "Fu" },
    { character: "ヘ", transcription: "He" },
    { character: "ホ", transcription: "Ho" },
    { character: "マ", transcription: "Ma" },
    { character: "ミ", transcription: "Mi" },
    { character: "ム", transcription: "Mu" },
    { character: "メ", transcription: "Me" },
    { character: "モ", transcription: "Mo" },
    { character: "ヤ", transcription: "Ya" },
    { character: "ユ", transcription: "Yu" },
    { character: "ヨ", transcription: "Yo" },
    { character: "ラ", transcription: "Ra" },
    { character: "リ", transcription: "Ri" },
    { character: "ル", transcription: "Ru" },
    { character: "レ", transcription: "Re" },
    { character: "ロ", transcription: "Ro" },
    { character: "ワ", transcription: "Wa" },
    { character: "ヲ", transcription: "Wo" },
    { character: "ン", transcription: "N" }
  ]);
  
  const hoveredIndex = ref(null);
  </script>
  
  <style scoped>
  .katakana-grid {
    font-family: Arial, sans-serif;
    padding: 20px;
    text-align: center;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .grid-item {
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    position: relative;
  }
  
  .grid-item.zoomed {
    transform: scale(1.2);
    background-color: #d0e8ff;
  }
  
  .character {
    font-size: 36px;
    color: #333;
  }
  
  .transcription {
    display: block;
    margin-top: 10px;
    font-size: 18px;
    color: #555;
  }
  
  .examples {
    margin-top: 40px;
  }
  
  .examples ul {
    list-style-type: none;
    padding: 0;
  }
  
  .examples li {
    margin: 10px 0;
    font-size: 18px;
  }
  </style>
  