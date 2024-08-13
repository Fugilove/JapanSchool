<template>
    <div v-if="visible" class="petal-transition" @animationend="onAnimationEnd">
      <div class="sakura">
        <!-- Создаем множество уникальных лепестков -->
        <div v-for="n in numPetals" :key="n" class="petal" :style="getPetalStyle(n)"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const visible = ref(false);
  const router = useRouter();
  const numPetals = 50; // Количество лепестков
  
  const onAnimationEnd = () => {
    visible.value = false;
  };
  
  // Watch for route changes to trigger the animation
  watch(() => router.currentRoute.value.fullPath, () => {
    visible.value = true;
  });
  
  const getPetalStyle = (index) => {
    const size = Math.random() * 15 + 10 + 'px'; // Размер лепестка
    const left = Math.random() * 50 + 'vw'; // Позиция по горизонтали
    const top = Math.random() * 50 + 'vh'; // Позиция по вертикали
    const animationDuration = Math.random() * 20 + 10 + 's'; // Продолжительность анимации
    const animationDelay = Math.random() * 10 + 's'; // Задержка анимации
  
    return {
      width: size,
      height: size,
      left: left,
      top: top,
      animationDuration: animationDuration,
      animationDelay: animationDelay,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
  };
  </script>
  
  <style scoped>
  .petal-transition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
    overflow: hidden;
    background: transparent; /* Убираем подложку */
    animation: fade-out 1s forwards;
  }
  
  .sakura {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .petal {
    position: absolute;
    background: linear-gradient(45deg, #ffb6c1, #ff6f6f);
    border-radius: 50% 50% 0 0;
    transform: rotate(-45deg);
    opacity: 0.8;
    animation: sakura-move linear infinite;
  }
  
  /* Плавный переход для исчезновения анимации */
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  /* Анимация движения лепестков по дуге */
  @keyframes sakura-move {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(50vw, 50vh) rotate(180deg);
    }
    100% {
      transform: translate(100vw, 100vh) rotate(360deg);
    }
  }
  </style>
  