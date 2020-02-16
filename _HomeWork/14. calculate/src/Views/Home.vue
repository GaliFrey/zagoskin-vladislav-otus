<template>
  <div class="card">
    <div class="card-body">
      <h2>Привет!</h2>
      <p>
        Добро пожаловать на 24 тренировочный день,<br />
        Ваш последний результат - решено {{ getStatistic.stat }}.<br />
        Общая точность {{ getStatistic.proc }}%
      </p>
      <form>
        <h4 class="pt-2">Настройки</h4>
        <div class="form-group">
          <input
            type="range"
            class="custom-range"
            min="1"
            max="15"
            id="timer"
            v-model="timeLeft"
          />
          <label for="timer">Длительность {{ timeLeft }} минут</label>

          <input
            type="range"
            class="custom-range"
            min="1"
            max="3"
            id="strange"
            v-model="gameDifficulty"
          />
          <label for="strange">Сложность {{ gameDifficulty }}</label>
        </div>
        <div class="form-group">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck1"
              value="+"
              v-model="mathOperations"
            />
            <label class="custom-control-label" for="customCheck1"
              >Суммирование
            </label>
          </div>

          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck2"
              value="-"
              v-model="mathOperations"
            />
            <label class="custom-control-label" for="customCheck2"
              >Разность</label
            >
          </div>

          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck3"
              value="*"
              v-model="mathOperations"
            />
            <label class="custom-control-label" for="customCheck3"
              >Умножение</label
            >
          </div>

          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck4"
              value="/"
              v-model="mathOperations"
            />
            <label class="custom-control-label" for="customCheck4"
              >Деление</label
            >
          </div>

          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck5"
              value="^"
              v-model="mathOperations"
            />
            <label class="custom-control-label" for="customCheck5"
              >Возведение в степень</label
            >
          </div>
        </div>
      </form>
      <router-link
        tag="button"
        to="/game"
        class="btn btn-outline-primary"
        style="float: right"
        :disabled="getCountOperations"
        >Играть</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getStatistic',
      'getCountOperations',
      'getTimeLeft',
      'getGameDifficulty',
      'getMathOperations'
    ]),
    timeLeft: {
      get() {
        return this.getTimeLeft;
      },
      set(value) {
        this.$store.dispatch('changeTimeLeft', value);
      }
    },
    /**Модель изменения параметра сложности */
    gameDifficulty: {
      get() {
        return this.getGameDifficulty;
      },
      set(value) {
        this.$store.dispatch('changeGameDifficulty', value);
      }
    },
    /**Модель изменения параметров возможных операций */
    mathOperations: {
      get() {
        return this.getMathOperations;
      },
      set(value) {
        this.$store.dispatch('changeOperations', value);
      }
    }
  }
};
</script>

<style>
form {
  width: 16rem;
  position: relative;
}
</style>
