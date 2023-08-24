// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Add more routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
