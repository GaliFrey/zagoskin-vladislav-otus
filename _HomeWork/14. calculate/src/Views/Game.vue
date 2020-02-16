<template>
  <div
    class="card"
    :class="{
      error: getParamAlert == 'error',
      success: getParamAlert == 'success'
    }"
  >
    <div class="card-body">
      <header>
        <router-link tag="button" to="/" class="btn btn-outline-primary">{{
          !getIsTimeOver ? 'Отмена' : 'Назад'
        }}</router-link>
        <div class="timer" :style="getGradient">
          {{ getStopWatchFormatTimer }}
        </div>
      </header>
      <div class="instance">
        <input class="operand1" v-model="getCurrentExpression[0]" disabled />
        <input
          class="operations"
          type="text"
          v-model="getCurrentExpression[1]"
          disabled
        />
        <input class="operand2" v-model.number.trim="getCurrentExpression[2]" />
        <input class="equally" value="=" />
        <input
          class="answer"
          type="text"
          v-model="getCurrentExpression[3]"
          disabled
        />
      </div>
      <div class="calculation pt-4">
        <div class="row">
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(1)">
              1
            </button>
          </div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(2)">
              2
            </button>
          </div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(3)">
              3
            </button>
          </div>
          <div class="col">
            <button
              :disabled="getIsTimeOver"
              class="bg-grey"
              @click="updateInputField('erase')"
            >
              &larr;
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(4)">
              4
            </button>
          </div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(5)">
              5
            </button>
          </div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(6)">
              6
            </button>
          </div>
          <div class="col">
            <button
              :disabled="getIsTimeOver"
              class="bg-grey"
              @click="updateInputField('clear')"
            >
              C
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(7)">
              7
            </button>
          </div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(8)">
              8
            </button>
          </div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(9)">
              9
            </button>
          </div>
          <div class="col">
            <button
              :disabled="getIsTimeOver"
              class="bg-grey"
              @click="skipExpression"
            >
              ?
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <button :disabled="getIsTimeOver" @click="updateInputField(0)">
              0
            </button>
          </div>
          <div class="col"></div>
          <div class="col">
            <button
              :disabled="getIsTimeOver"
              class="bg-grey"
              @click="checkExpression"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getStopWatchFormatTimer',
      'getIsTimeOver',
      'getGradient',
      'getCurrentExpression',
      'getParamAlert',
      'getStopWatch'
    ])
  },
  methods: {
    /**Событие на кнопку = */
    checkExpression() {
      this.$store.dispatch('checkExpression');
    },
    /**Событие на кнопку ? */
    skipExpression() {
      this.$store.dispatch('liveExpression');
    },
    updateInputField(e) {
      this.$store.dispatch('updateInputField', e);
    }
  },
  /**При монтировании компонента запускаем таймер обратного отсчета */
  mounted() {
    this.$store.dispatch('startGame');

    this.timer = setInterval(() => {
      this.$store.dispatch('decrementStopWatch');

      if (this.getStopWatch <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  },
  /**при перезагрузке страницы вызываем конец игры */
  destroyed() {
    clearInterval(this.timer);
    this.$store.dispatch('endGame');
  }
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
}

.timer {
  padding: 6px 12px;
  border: 3px solid rgb(0, 123, 255);
  box-sizing: content-box;
  width: 6rem;
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

.timer:hover {
  cursor: pointer;
}

.instance {
  font-size: 1.7rem;
  padding-top: 2rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

input {
  height: 50px;
  background: transparent;
  outline: none;
}

input.operand1 {
  width: 100px;
  border: none;
  font-weight: bold;
  text-align: right;
}

input.operations {
  border: none;
  text-align: center;
  font-weight: bold;
  width: 50px;
}

input.operand2 {
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 150px;
  font-weight: bold;
  text-align: center;
}

input.equally {
  width: 50px;
  border: none;
  text-align: center;
}

input.answer {
  width: 100px;
  border: none;
  font-weight: bold;
  text-align: left;
}

.col {
  display: flex;
  justify-content: center;
}

.col button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  margin: 10px;
  outline: none;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.6);
  background: coral;
  font-weight: bold;
  font-size: 1.5rem;
}

.bg-grey {
  background: rgba(0, 0, 0, 0.5) !important;
}

.col button:active {
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.error {
  box-shadow: inset 0px 0px 10px 1px red;
}

.success {
  box-shadow: inset 0px 0px 10px 1px green;
}
</style>
