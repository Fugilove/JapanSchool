<template>
  <div class="cat-animation-container">
    <h1>Котик завершает своё путешествие!</h1>

    <div class="animation-stage" v-if="lessons.length > 0">
      <div v-for="(lesson, index) in lessons" :key="lesson.id" class="block">
        <!-- Отображаем котика только на нужных уроках -->
        <img
          v-if="shouldShowCat(index)"
          :src="catImage"
          class="cat-image"
          :style="{ left: catPosition + '%' }"
          alt="Котик"
        />
        <p clss="z-index-1">{{ lesson.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import catImage from '@/assets/cat.png';

const store = useStore();

const currentLessonId = computed(() => store.state.currentLessonId);

const lessons = [
  { id: 6, title: 'Хирагана' },
  { id: 11, title: 'Катакана' },
  { id: 13, title: 'Кандзи' },
];

// Функция, определяющая, нужно ли показывать котика
const shouldShowCat = (index) => {
  const currentIndex = lessons.findIndex(l => l.id === currentLessonId.value);
  return index === currentIndex;
};

const catPosition = ref(0);


</script>

<style scoped>
.cat-animation-container {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.animation-stage {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  position: relative;
  gap: 10px;
}

.block {
  width: 30%;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  padding: 15px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  z-index: 1; /* Позиционирование выше, чем у котика */

}

.block:hover {
  transform: translateY(-10px);
  background: linear-gradient(135deg, #ec73e2, #dda9eb);
}

.block p {
  font-weight: bold;
  color: #333;
}

.cat-image {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  z-index: 0; /* Котик будет за блоком */
}
</style>
