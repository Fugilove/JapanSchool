<template>
    <div class="katakana-lesson">
      
      <p>В этом уроке мы изучим Катакану и узнаем, чем она отличается от Хираганы.</p>
      
      <div class="section">
        <h2>Что такое Катакана?</h2>
        <p>
          Катакана — это одна из трёх систем письма японского языка. Она используется для написания заимствованных слов, иностранных имён,
          научных терминов и ономатопеи (звуков). Каждый символ Катаканы представляет собой отдельный слог.
        </p>
      </div>
  
      <div class="section">
        <h2>Чем Катакана отличается от Хираганы?</h2>
        <p>
          Хотя Катакана и Хирагана представляют одинаковые звуки, они выглядят по-разному и имеют разное применение:
        </p>
        <ul>
          <li><strong>Хирагана:</strong> Используется для записи японских слов и грамматических частей (окончаний, частиц).</li>
          <li><strong>Катакана:</strong> Используется для записи иностранных слов, имён, названий компаний и звуков (например, звукоподражаний).</li>
        </ul>
      </div>
  
      <div class="examples ">
        <h2>Примеры символов</h2>
        <div class="example">
          <h3>А (あ и ア)</h3>
          <div class="symbols">
            <div class="symbol">
              <p><strong>Хирагана:</strong></p>
              <p class="hiragana">あ</p>
            </div>
            <div class="symbol">
              <p><strong>Катакана:</strong></p>
              <p class="katakana">ア</p>
            </div>
          </div>
        </div>
  
        <div class="example">
          <h3>Ки (き и キ)</h3>
          <div class="symbols">
            <div class="symbol">
              <p><strong>Хирагана:</strong></p>
              <p class="hiragana">き</p>
            </div>
            <div class="symbol">
              <p><strong>Катакана:</strong></p>
              <p class="katakana">キ</p>
            </div>
          </div>
        </div>
  
        <div class="example">
          <h3>Са (さ и サ)</h3>
          <div class="symbols">
            <div class="symbol">
              <p><strong>Хирагана:</strong></p>
              <p class="hiragana">さ</p>
            </div>
            <div class="symbol">
              <p><strong>Катакана:</strong></p>
              <p class="katakana">サ</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section">
        <h2>Когда использовать Катакану?</h2>
        <p>
          Катакана используется в следующих случаях:
        </p>
        <ul>
          <li>Иностранные слова и имена (например, コンピュータ для "computer").</li>
          <li>Научные термины (например, アルコール для "алкоголь").</li>
          <li>Звукоизображение (например, ワンワン для "гав-гав").</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .katakana-lesson {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  .examples {
    margin-top: 30px;
    margin-right: 30px;
  }
  
  .example {
    margin-bottom: 15px;
  }
  
  .symbols {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .symbol {
    width: 45%;
    text-align: center;
  }
  
  .hiragana {
    font-size: 48px;
    color: #FF5733;
  }
  
  .katakana {
    font-size: 48px;
    color: #3375FF;
  }
  </style>
  