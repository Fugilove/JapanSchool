// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Lesson from '../views/Lesson.vue';
import LessonDetail from '../views/LessonDetail.vue';
import BasicPhrases from '../components/BasicPhrases.vue';
import News from '../components/News.vue'; 
import Diary from '@/components/Diary.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/lessons', component: Lesson },
  { path: '/lessons/:id', component: LessonDetail },
  {
    path: '/lessons/phrases',
    component: BasicPhrases 
  },
  {
    path: '/lessons/news',
    component: News
  },
  {
    path: '/lessons/Diary',
    component: Diary
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

