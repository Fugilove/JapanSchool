

import { createStore } from 'vuex';

// Определите компоненты уроков
import HiraganaLessons from './components/Hiragana/HiraganaLessons.vue';
import HiraganaLessons2 from './components/Hiragana/HiraganaLessons2.vue';
import HiraganaVictorina from './components/Hiragana/HiraganaVictorina.vue'; 
import HiraganaTake from './components/Hiragana/HiraganaTake.vue';
import HiraganaFinal from './components/Hiragana/HiraganaFinal.vue'; 
import KatakanaLessons from './components/Katakana/KatakanaLessons.vue';
import KanjiLessons from './components/KanjiLessons.vue';
import CatAnimation from './components/CatAnimation.vue';
import KatakanaLessons2 from './components/Katakana/KatakanaLessons2.vue';
import KatakanaLessons3 from './components/Katakana/KatakanaLessons3.vue';
import KatakanaGui from './components/Katakana/KatakanaGui.vue';

const lessons = [
  { id: 1, title: 'Урок 1: Хирагана', component: HiraganaLessons },
  { id: 2, title: 'Урок 2: Хирагана Продолжение', component: HiraganaLessons2 },
  { id: 3, title: 'Урок 3: Хирагана Закрепляем', component: HiraganaVictorina },
  { id: 4, title: 'Урок 4: Хирагана Изучаем слова', component: HiraganaTake },
  { id: 5, title: 'Урок 5: Хирагана Финал', component: HiraganaFinal },
  { id: 6, title: 'Котик: Путешествие по урокам', component: CatAnimation },
  { id: 7, title: 'Урок 6: Катакана', component: KatakanaLessons },
  { id: 8, title: 'Урок 7: Катакана урок 2', component: KatakanaLessons2 },
  { id: 9, title: 'Урок 7: Катакана урок 3', component: KatakanaLessons3 },
  { id: 10, title: 'Урок 9: Пробуем писать', component: KatakanaGui },
  { id: 11, title: 'Котик: Путешествие по урокам', component: CatAnimation },
  { id: 12, title: 'Урок 8: Кандзи', component: KanjiLessons },
  { id: 13, title: 'Котик: Путешествие по урокам', component: CatAnimation },
  
];

// Создание хранилища
const store = createStore({
  state() {
    return {
      currentLessonId: 1, // начальный урок
    };
  },
  mutations: {
    setCurrentLessonId(state, id) {
      state.currentLessonId = id;
    },
  },
  actions: {
    goToNextLesson({ commit, state }) {
      const currentIndex = lessons.findIndex(l => l.id === state.currentLessonId);
      if (currentIndex < lessons.length - 1) {
        commit('setCurrentLessonId', lessons[currentIndex + 1].id);
      }
    },
    goToPreviousLesson({ commit, state }) {
      const currentIndex = lessons.findIndex(l => l.id === state.currentLessonId);
      if (currentIndex > 0) {
        commit('setCurrentLessonId', lessons[currentIndex - 1].id);
      }
    },
  },
  getters: {
    currentLesson(state) {
      return lessons.find(l => l.id === state.currentLessonId);
    },
    nextLessonId(state) {
      const currentIndex = lessons.findIndex(l => l.id === state.currentLessonId);
      return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1].id : null;
    },
  },
});

export default store;
