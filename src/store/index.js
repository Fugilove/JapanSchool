// store/index.js

import { createStore } from 'vuex';
import HiraganaLessons from '../components/Hiragana/HiraganaLessons.vue';
import HiraganaLessons2 from '../components/Hiragana/HiraganaLessons2.vue';
import KatakanaLessons from '../components/Katakana/KatakanaLessons.vue';
import KanjiLessons from '../components/KanjiLessons.vue';

const store = createStore({
  state() {
    return {
      currentLessonId: 1, // Начальный урок
    };
  },
  getters: {
    getLessonComponent(state) {
      const lessons = [
        { id: 1, component: HiraganaLessons },
        { id: 2, component: HiraganaLessons2 },
        { id: 3, component: KatakanaLessons },
        { id: 4, component: KanjiLessons },
      ];
      const lesson = lessons.find(lesson => lesson.id === state.currentLessonId);
      return lesson ? lesson.component : null;
    },
  },
  mutations: {
    setLessonId(state, lessonId) {
      state.currentLessonId = lessonId;
    },
  },
  actions: {
    goToNextLesson({ commit, state }) {
      commit('setLessonId', state.currentLessonId + 1);
    },
    goToPreviousLesson({ commit, state }) {
      commit('setLessonId', state.currentLessonId - 1);
    },
    setLesson({ commit }, lessonId) {
      commit('setLessonId', lessonId);
    },
  },
});

export default store;
