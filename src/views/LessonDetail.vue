<template>
    <div class="lesson-detail">
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <component :is="lesson.component" key="lessonComponent" />
      </transition>
      <div class="navigation">
        <button
          v-if="lesson.id > 1"
          @click="goToPreviousLesson"
          class="button"
        >
          Назад
        </button>
        <button
          v-if="nextLessonId !== null"
          @click="goToNextLesson"
          class="button"
        >
          Вперед
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  
  const lessonId = parseInt(route.params.id);
  
  const lesson = computed(() => store.getters.currentLesson);
  const nextLessonId = computed(() => store.getters.nextLessonId);
  
  const goToNextLesson = () => {
    store.dispatch('goToNextLesson').then(() => {
      router.push(`/lessons/${store.state.currentLessonId}`);
    });
  };
  
  const goToPreviousLesson = () => {
    store.dispatch('goToPreviousLesson').then(() => {
      router.push(`/lessons/${store.state.currentLessonId}`);
    });
  };
  </script>
  
  <style scoped>
  .lesson-detail {
    padding: 20px;
    background: #f5f5dc; /* Цвет, напоминающий пергамент */
    border: 1px solid #d3b572; /* Легкая рамка для эффекта пергамента */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: auto;
    font-family: 'Noto Sans JP', sans-serif; /* Японский шрифт для лучшего эффекта */
  }
  
  h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #4b2e1b; /* Цвет, имитирующий чернила */
  }
  
  p {
    font-size: 1.2em;
    line-height: 1.6;
    color: #3e2723; /* Темный цвет текста */
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .button {
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
  
  .button:hover {
    background-color: #7a6d53; /* Более темный оттенок при наведении */
  }
  
  /* Анимация переходов */
  .fade-enter-active, .fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active в <2.1.8 */ {
    opacity: 0;
  }
  </style>
  