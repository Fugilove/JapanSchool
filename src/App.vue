<template>
  <div id="app">
    
    <header>
      <h1>Японский язык с сакурой</h1>
      <nav>
        <router-link to="/" class="nav-button">Главная</router-link>
        <router-link to="/lessons" class="nav-button">Уроки</router-link>
        <router-link to="/lessons/Diary" class="nav-button">Мой дневник</router-link>
      </nav>
    </header>

    
    <main>
      <transition
        name="fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <router-view />
      </transition>
    </main>

    
    <footer>
      <p>&copy; 2024 Учебный сайт японского языка</p>
    </footer>
    
    <PetalTransition />
  </div>
</template>

<script setup>
import PetalTransition from './components/PetalTransition.vue';

const beforeEnter = (el) => {
  el.style.opacity = 0;
};

const enter = (el, done) => {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'opacity 0.1s';
  el.style.opacity = 1;
  done();
};

const leave = (el, done) => {
  el.style.transition = 'opacity 0.5s';
  el.style.opacity = 0;
  done();
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffe4e1; /* Нежно-розовый фон */
  position: relative;
  overflow: hidden; /* Прячем любые переполнения у корневого контейнера */
  background-image: url('@/assets/back.png');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover; /* Регулируйте размер изображения по вашему усмотрению */
}

header {
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  box-shadow: 5px 5px 20px 5px #000
}

header h1 {
  margin: 0;
  font-size: 2.5em; /* Увеличен размер заголовка */
  color: #4b2e1b; /* Тёмный цвет текста, напоминающий чернила */
}

nav {
  margin-top: 10px;
}

.nav-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #eb6894; /* Яркий розовый цвет для кнопок */
  border: none;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-button:hover {
  background-color: #81123f; /* Более тёмный оттенок при наведении */
  transform: scale(1.05); /* Легкое увеличение кнопки при наведении */
}

main {
  flex: 1;
  padding: 20px;
  position: relative;
  z-index: 1;
  max-width: 100%; 
  box-sizing: border-box; 
  overflow: auto; 
  transition: width 3s ease, height 3s ease;
  box-shadow: 5px 5px 20px 5px #000 
}


footer {
  background-color: #f4f4f4;
  padding: 10px;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  box-shadow: 5px 5px 20px 5px #000
}

.petal-transition {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Лепестки не должны мешать взаимодействию с элементами страницы */
  z-index: 0;
}

/* Анимация плавного перехода */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s; 
}

.fade-enter, .fade-leave-to /* .fade-leave-active в <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}


</style>
