<template>
  <div class="container pt-5">
    <app-home v-if="componentShow === 'Home'" @show="showComponent"></app-home>
    <app-game v-if="componentShow === 'Game'" @show="showComponent"></app-game>
  </div>
</template>

<script>
import Home from './components/Home';
import Game from './components/Game';

export default {
  data() {
    return {
      componentShow: 'Game'
    };
  },
  components: {
    'app-home': Home,
    'app-game': Game
  },
  methods: {
    showComponent(val) {
      this.componentShow = val;
    }
  }
};
</script>

<style>
body {
  background: rgba(0, 0, 0, 0.1);
}

.card {
  width: 500px;
  height: 520px;
  border-radius: 10px;
}
</style>
