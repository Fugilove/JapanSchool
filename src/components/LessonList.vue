<template>
  <div class="lesson-form" :class="{ 'expanded': isExpanded }">
    <!-- Показ кнопок до расширения -->
    <transition name="fade" @before-leave="beforeLeave" @leave="leave">
      <div v-if="!isExpanded" class="button-container">
        <router-link to="/lessons/foundation" class="button" @click="handleButtonClick">Основы</router-link>
        <router-link to="/lessons/phrases" class="button">Базовые фразы</router-link>
        <router-link to="/lessons/news" class="button" >Новости Японии</router-link>
      </div>
    </transition>

    <!-- Показ компонента базовых фраз при выборе -->
    <transition name="fade">
      <div v-if="isExpanded && selectedSection === 'phrases'" class="expanded-content">
        <BasicPhrases />
      </div>
    </transition>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import BasicPhrases from './BasicPhrases.vue'; 

const isExpanded = ref(false);
const selectedSection = ref('');

const handleButtonClick = (section) => {
  isExpanded.value = true;
  selectedSection.value = section;
};

const beforeLeave = (el) => {
  el.style.opacity = 1;
};

const leave = (el, done) => {
  el.style.transition = 'opacity 1s';
  el.style.opacity = 0;
  done();
};
</script>

<style scoped>
.lesson-form {
  padding: 50px;
  background: #f5f5dc;
  border: 1px solid #d3b572;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  margin: auto;
  font-family: 'Noto Sans JP', sans-serif;
  transition: padding 0.5s, height 0.5s; /* Плавное изменение высоты и padding */
}

.lesson-form.expanded {
  padding: 50px 50px 100px; /* Увеличение padding при расширении */
  height: 500px; /* Поставьте желаемую высоту для расширенного блока */
}

.button-container {
  display: flex;
  justify-content: space-around; /* Равномерное распределение кнопок */
}

.button {
  display: inline-block;
  padding: 35px 20px;
  margin: 5%;
  font-size: 1.2em;
  color: #fff;
  background-color: #8e7d5b; /* Цвет кнопки */
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.button:hover {
  background-color: #7a6d53; /* Цвет кнопки при наведении */
  transform: scale(1.05); /* Легкое увеличение кнопки при наведении */
}

.expanded-content {
  opacity: 0;
  transition: opacity 0.5s;
}

.expanded-content-enter-active, .expanded-content-leave-active {
  transition: opacity 0.5s;
}

.expanded-content-enter, .expanded-content-leave-to {
  opacity: 1;
}
</style>
