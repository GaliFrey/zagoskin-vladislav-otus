import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './Home.vue';
import Game from './Game.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/game',
      component: Game
    }
  ],
  mode: 'history'
});

export default router;
