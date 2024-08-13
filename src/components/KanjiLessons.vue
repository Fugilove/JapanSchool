<template>
  <div class="kanji-lessons">
    <h1>Уроки Кандзи</h1>
    <p>Кандзи — это идеографические символы, используемые в японском языке. В этом уроке мы рассмотрим основные символы Кандзи и их значения.</p>
    
    <div class="kanji-container">
      <div class="kanji-grid">
        <div 
          class="kanji-card" 
          v-for="(symbol, index) in kanjiSymbols" 
          :key="index"
          @click="openModal(symbol)"
        >
          <div class="kanji-symbol">{{ symbol.character }}</div>
          <div class="kanji-reading">{{ symbol.reading }}</div>
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ selectedSymbol.character }}</h2>
        <p><strong>Чтение:</strong> {{ selectedSymbol.reading }}</p>
        <p><strong>Значение:</strong> {{ selectedSymbol.meaning }}</p>
        <p><strong>Примеры слов:</strong> {{ selectedSymbol.examples.join(', ') }}</p>
        <button @click="speakSymbol" class="modal-speak-button">Озвучить</button>
        <button @click="closeModal" class="modal-close-button">Закрыть</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const kanjiSymbols = [
  { character: '一', reading: 'いち / いつ', meaning: 'один', examples: ['一月 (январь)', '一人 (один человек)'] },
  { character: '二', reading: 'に', meaning: 'два', examples: ['二月 (февраль)', '二人 (два человека)'] },
  { character: '三', reading: 'さん', meaning: 'три', examples: ['三月 (март)', '三人 (три человека)'] },
  { character: '四', reading: 'し / よん', meaning: 'четыре', examples: ['四月 (апрель)', '四人 (четыре человека)'] },
  { character: '五', reading: 'ご', meaning: 'пять', examples: ['五月 (май)', '五人 (пять человек)'] },
  { character: '六', reading: 'ろく', meaning: 'шесть', examples: ['六月 (июнь)', '六人 (шесть человек)'] },
  { character: '七', reading: 'しち / なな', meaning: 'семь', examples: ['七月 (июль)', '七人 (семь человек)'] },
  { character: '八', reading: 'はち', meaning: 'восемь', examples: ['八月 (август)', '八人 (восемь человек)'] },
  { character: '九', reading: 'きゅう / く', meaning: 'девять', examples: ['九月 (сентябрь)', '九人 (девять человек)'] },
  { character: '十', reading: 'じゅう', meaning: 'десять', examples: ['十月 (октябрь)', '十人 (десять человек)'] },
  { character: '百', reading: 'ひゃく', meaning: 'сто', examples: ['百円 (сто йен)', '三百 (триста)'] },
  { character: '千', reading: 'せん', meaning: 'тысяча', examples: ['千円 (тысяча йен)', '三千 (три тысячи)'] },
  { character: '万', reading: 'まん', meaning: 'десять тысяч', examples: ['万歳 (ура!)', '一万 (десять тысяч)'] },
  { character: '円', reading: 'えん', meaning: 'йена / круг', examples: ['円形 (круглая форма)', '円 (йена)'] },
  { character: '口', reading: 'くち', meaning: 'рот', examples: ['口紅 (помада)', '口 (рот)'] },
  { character: '目', reading: 'め', meaning: 'глаз', examples: ['目標 (цель)', '目 (глаз)'] },
  { character: '耳', reading: 'みみ', meaning: 'ухо', examples: ['耳鼻科 (отоларингология)', '耳 (ухо)'] },
  { character: '手', reading: 'て', meaning: 'рука', examples: ['手紙 (письмо)', '手 (рука)'] },
  { character: '足', reading: 'あし', meaning: 'нога / 足', examples: ['足りる (достаточно)', '足 (нога)'] },
  { character: '心', reading: 'こころ', meaning: 'сердце / душа', examples: ['心臓 (сердце)', '心 (душа)'] },
  { character: '力', reading: 'ちから', meaning: 'сила', examples: ['力士 (рёсика)', '力 (сила)'] },
  { character: '雨', reading: 'あめ', meaning: 'дождь', examples: ['雨天 (дождливая погода)', '雨 (дождь)'] },
  { character: '天', reading: 'てん', meaning: 'небо', examples: ['天気 (погода)', '天 (небо)'] },
  { character: '火', reading: 'ひ / か', meaning: 'огонь', examples: ['火曜日 (вторник)', '火 (огонь)'] },
  { character: '水', reading: 'みず', meaning: 'вода', examples: ['水曜日 (среда)', '水 (вода)'] },
  { character: '木', reading: 'き', meaning: 'дерево', examples: ['木曜日 (четверг)', '木 (дерево)'] },
  { character: '金', reading: 'きん', meaning: 'золото / деньги', examples: ['金曜日 (пятница)', '金 (золото)'] },
  { character: '土', reading: 'つち', meaning: 'земля', examples: ['土曜日 (суббота)', '土 (земля)'] },
  { character: '日', reading: 'にち / じつ', meaning: 'день / солнце', examples: ['日本 (Япония)', '日曜日 (воскресенье)'] },
  { character: '月', reading: 'つき / げつ', meaning: 'месяц / луна', examples: ['月曜日 (понедельник)', '月 (луна)'] },
  { character: '山', reading: 'やま', meaning: 'гора', examples: ['山 (гора)', '富士山 (гора Фудзи)'] },
  { character: '川', reading: 'かわ', meaning: 'река', examples: ['川 (река)', '河川 (реки)'] },
  { character: '田', reading: 'た', meaning: 'рисовое поле', examples: ['田んぼ (рисовое поле)', '田 (рисовое поле)'] },
  { character: '村', reading: 'むら', meaning: 'деревня', examples: ['村 (деревня)', '村人 (житель деревни)'] },
  { character: '町', reading: 'ちょう', meaning: 'город', examples: ['町 (город)', '町役場 (муниципалитет)'] },
  { character: '家', reading: 'いえ', meaning: 'дом', examples: ['家族 (семья)', '家 (дом)'] },
  { character: '学校', reading: 'がっこう', meaning: 'школа', examples: ['学校 (школа)', '校 (учебное заведение)'] },
  { character: '先生', reading: 'せんせい', meaning: 'учитель', examples: ['先生 (учитель)', '教師 (преподаватель)'] },
  { character: '学生', reading: 'がくせい', meaning: 'студент', examples: ['学生 (студент)', '生徒 (ученик)'] },
  { character: '日', reading: 'にち / じつ', meaning: 'день / солнце', examples: ['日本 (Япония)', '日曜日 (воскресенье)'] },
  { character: '本', reading: 'ほん', meaning: 'книга / основа', examples: ['本 (книга)', '日本 (Япония)'] },
  { character: '友', reading: 'とも', meaning: 'друг', examples: ['友達 (друг)', '友人 (друг, приятель)'] },
  { character: '愛', reading: 'あい', meaning: 'любовь', examples: ['愛 (любовь)', '愛情 (любовь, привязанность)'] },
  { character: '力', reading: 'ちから', meaning: 'сила', examples: ['力 (сила)', '努力 (усилие)'] },
  { character: '知', reading: 'しる', meaning: 'знание', examples: ['知識 (знание)', '知る (знать)'] },
  { character: '生', reading: 'せい', meaning: 'жизнь', examples: ['生活 (жизнь)', '生まれる (родиться)'] },
  { character: '言', reading: 'い', meaning: 'слово', examples: ['言葉 (слово)', '言う (говорить)'] },
  { character: '語', reading: 'ご', meaning: 'язык', examples: ['言語 (язык)', '日本語 (японский язык)'] },
  { character: '話', reading: 'はなし', meaning: 'разговор', examples: ['話す (говорить)', '話題 (тема разговора)'] },
  { character: '書', reading: 'しょ', meaning: 'писать', examples: ['書く (писать)', '書類 (документы)'] },
  { character: '読', reading: 'よむ', meaning: 'читать', examples: ['読む (читать)', '読書 (чтение)'] },
  { character: '見', reading: 'みる', meaning: 'смотреть', examples: ['見る (смотреть)', '見学 (экскурсия)'] },
  { character: '買', reading: 'かう', meaning: 'покупать', examples: ['買う (покупать)', '買い物 (покупки)'] },
  { character: '売', reading: 'うる', meaning: 'продавать', examples: ['売る (продавать)', '売店 (магазин)'] },
  { character: '走', reading: 'はしる', meaning: 'бежать', examples: ['走る (бежать)', '走行 (движение)'] },
  { character: '歩', reading: 'あるく', meaning: 'идти', examples: ['歩く (идти)', '徒歩 (пешком)'] },
  { character: '運', reading: 'うん', meaning: 'удача / движение', examples: ['運転 (вождение)', '運 (удача)'] },
  { character: '楽', reading: 'たのしい / がく', meaning: 'радость / музыка', examples: ['楽しい (радостный)', '音楽 (музыка)'] },
  { character: '食', reading: 'たべる', meaning: 'есть', examples: ['食べる (есть)', '食事 (еда)'] },
  { character: '飲', reading: 'のむ', meaning: 'пить', examples: ['飲む (пить)', '飲み物 (напитки)'] },
  { character: '空', reading: 'そら', meaning: 'небо / пустота', examples: ['空 (небо)', '空き (пустота)'] },
  { character: '天', reading: 'てん', meaning: 'небо', examples: ['天気 (погода)', '天 (небо)'] },
  { character: '星', reading: 'ほし', meaning: 'звезда', examples: ['星 (звезда)', '星座 (созвездие)'] },
  { character: '海', reading: 'うみ', meaning: 'море', examples: ['海 (море)', '海岸 (берег моря)'] },
  { character: '山', reading: 'やま', meaning: 'гора', examples: ['山 (гора)', '山登り (восхождение на гору)'] },
  { character: '川', reading: 'かわ', meaning: 'река', examples: ['川 (река)', '河川 (реки)'] },
  { character: '湖', reading: 'みずうみ', meaning: 'озеро', examples: ['湖 (озеро)', '湖畔 (берег озера)'] },
  { character: '草', reading: 'くさ', meaning: 'трава', examples: ['草 (трава)', '草原 (луг)'] },
  { character: '花', reading: 'はな', meaning: 'цветок', examples: ['花 (цветок)', '花見 (просмотр цветов)'] },
  { character: '木', reading: 'き', meaning: 'дерево', examples: ['木 (дерево)', '木材 (древесина)'] },
  { character: '竹', reading: 'たけ', meaning: 'бамбук', examples: ['竹 (бамбук)', '竹林 (бамбуковый лес)'] },
  { character: '米', reading: 'こめ', meaning: 'рис', examples: ['米 (рис)', '米国 (США)'] },
  { character: '豆', reading: 'まめ', meaning: 'боб', examples: ['豆 (боб)', '豆腐 (тофу)'] },
  { character: '魚', reading: 'さかな', meaning: 'рыба', examples: ['魚 (рыба)', '魚介類 (морепродукты)'] },
  { character: '肉', reading: 'にく', meaning: 'мясо', examples: ['肉 (мясо)', '肉体 (тело)'] },
  { character: '鳥', reading: 'とり', meaning: 'птица', examples: ['鳥 (птица)', '鳥類 (птицы)'] },
  { character: '牛', reading: 'うし', meaning: 'корова', examples: ['牛 (корова)', '牛肉 (говядина)'] },
  { character: '馬', reading: 'うま', meaning: 'лошадь', examples: ['馬 (лошадь)', '馬車 (карета)'] },
  { character: '犬', reading: 'いぬ', meaning: 'собака', examples: ['犬 (собака)', '犬小屋 (собачья будка)'] },
  { character: '猫', reading: 'ねこ', meaning: 'кошка', examples: ['猫 (кошка)', '猫耳 (уши кошки)'] },
  { character: '虫', reading: 'むし', meaning: 'жук / насекомое', examples: ['虫 (жук)', '昆虫 (насекомое)'] },
  { character: '肉', reading: 'にく', meaning: 'мясо', examples: ['肉 (мясо)', '肉体 (тело)'] },
  { character: '笑', reading: 'わらう', meaning: 'смеяться', examples: ['笑う (смеяться)', '笑顔 (улыбка)'] },
  { character: '泣', reading: 'なく', meaning: 'плакать', examples: ['泣く (плакать)', '涙 (слеза)'] },
  { character: '怒', reading: 'おこる', meaning: 'злиться', examples: ['怒る (злиться)', '怒り (гнев)'] },
  { character: '悲', reading: 'かなしい', meaning: 'грустный', examples: ['悲しい (грустный)', '悲劇 (трагедия)'] },
  { character: '幸', reading: 'こう', meaning: 'счастье', examples: ['幸せ (счастье)', '幸福 (благополучие)'] },
  { character: '願', reading: 'ねがう', meaning: 'желать', examples: ['願う (желать)', '願い (желание)'] },
  { character: '始', reading: 'はじまる', meaning: 'начинать', examples: ['始まる (начинаться)', '始まり (начало)'] },
  { character: '終', reading: 'おわる', meaning: 'заканчивать', examples: ['終わる (заканчиваться)', '終了 (окончание)'] },
  { character: '時', reading: 'じ', meaning: 'время', examples: ['時間 (время)', '時計 (часы)'] },
  { character: '分', reading: 'ふん / ぶん', meaning: 'минута / разделение', examples: ['分 (минута)', '部分 (часть)'] },
  { character: '時', reading: 'じ', meaning: 'время', examples: ['時間 (время)', '時計 (часы)'] },
  { character: '国', reading: 'くに', meaning: 'страна', examples: ['国 (страна)', '外国 (иностранные страны)'] },
  { character: '道', reading: 'みち', meaning: 'путь', examples: ['道 (путь)', '道路 (дорога)'] },
  { character: '車', reading: 'くるま', meaning: 'машина', examples: ['車 (машина)', '自動車 (автомобиль)'] },
  { character: '空', reading: 'そら', meaning: 'небо', examples: ['空 (небо)', '空気 (воздух)'] },
  { character: '天', reading: 'てん', meaning: 'небо', examples: ['天気 (погода)', '天 (небо)'] },
  { character: '音', reading: 'おと', meaning: 'звук', examples: ['音 (звук)', '音楽 (музыка)'] },
  { character: '声', reading: 'こえ', meaning: 'голос', examples: ['声 (голос)', '声優 (актёр озвучивания)'] },
  { character: '光', reading: 'ひかり', meaning: 'свет', examples: ['光 (свет)', '光線 (луч света)'] },
  { character: '色', reading: 'いろ', meaning: 'цвет', examples: ['色 (цвет)', '色々 (разные)'] },
  { character: '青', reading: 'あお', meaning: 'синий', examples: ['青 (синий)', '青空 (синее небо)'] },
  { character: '赤', reading: 'あか', meaning: 'красный', examples: ['赤 (красный)', '赤ちゃん (младенец)'] },
  { character: '白', reading: 'しろ', meaning: 'белый', examples: ['白 (белый)', '白い (белый)'] },
  { character: '黒', reading: 'くろ', meaning: 'чёрный', examples: ['黒 (чёрный)', '黒い (чёрный)'] },
  { character: '茶', reading: 'ちゃ', meaning: 'чай', examples: ['茶 (чай)', 'お茶 (зеленый чай)'] }
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

const speakSymbol = () => {
  if (!selectedSymbol.value) return;
  const utterance = new SpeechSynthesisUtterance(selectedSymbol.value.character);
  utterance.lang = 'ja-JP'; // Устанавливаем язык на японский
  speechSynthesis.speak(utterance);
};
</script>


<style scoped>
.modal-speak-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  margin: 4px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-speak-button:hover {
  background-color: #388e3c;
}
.kanji-lessons {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: 'Noto Sans JP', sans-serif;
}

.kanji-lessons h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #4b2e1b;
}

.kanji-lessons p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #3e2723;
}

.kanji-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.kanji-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.kanji-card:hover {
  transform: scale(1.1);
}

.kanji-symbol {
  font-size: 2em;
  margin-bottom: 5px;
}

.kanji-reading {
  font-size: 1.2em;
  color: #6d4c41;
}

.kanji-exercise {
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
  background-color: #8e7d5b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-close-button:hover {
  background-color: #7a6d53;
}
</style>
