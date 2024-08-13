<template>
  <div v-if="visible" class="petal-transition" @animationend="onAnimationEnd">
    <div class="petals"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const visible = ref(false);
const router = useRouter();

const onAnimationEnd = () => {
  visible.value = false;
};

// Watch for route changes to trigger the animation
watch(() => router.currentRoute.value.fullPath, () => {
  visible.value = true;
});
</script>

<style scoped>
.petal-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
  animation: petal-fall 1s forwards;
}

.petal-transition .petals {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/petal.png') repeat;
  animation: petals-move 1s forwards;
}

@keyframes petal-fall {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes petals-move {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
