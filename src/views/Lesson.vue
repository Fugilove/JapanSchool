<template>
    <div class="lesson-page">
      
      <LessonList />
    </div>
  </template>
  
  <script setup>
  import SakuraTree from '../components/SakuraTree.vue';
  import LessonList from '../components/LessonList.vue';
  </script>
  
  <style scoped>
  .lesson-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  