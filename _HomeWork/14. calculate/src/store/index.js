import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timeLeft: 7,
    stopWatch: 420,
    gameDifficulty: 2,
    mathOperations: ['+'],
    result: [],
    gradient:
      'background: linear-gradient(270deg, rgb(0, 123, 255) 100%, rgba(0,0,0,0.1) 100%)',
    expression: [],
    alert: ''
  },
  getters: {
    getTimeLeft(state) {
      return state.timeLeft;
    },
    getGameDifficulty(state) {
      return state.gameDifficulty;
    },
    getMathOperations(state) {
      return state.mathOperations;
    },
    getStopWatch(state) {
      return state.stopWatch;
    },
    getStatistic(state) {
      const result = state.result;
      const countTry = result.length;
      const countWin = result.filter(result => result === '+').length;
      return {
        stat: `${countWin} из ${countTry}`,
        proc: Math.floor((countWin / countTry) * 100) || 0
      };
    },
    getCountOperations(state) {
      return state.mathOperations.length == 0;
    },
    getStopWatchFormatTimer(state) {
      let minutes = Math.floor(state.stopWatch / 60);
      let seconds = state.stopWatch - minutes * 60;
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },
    getIsTimeOver(state) {
      return state.stopWatch <= 0;
    },
    getGradient(state) {
      const procent = (state.stopWatch * 100) / (state.timeLeft * 60);
      return `background: linear-gradient(270deg, rgb(0, 123, 255) ${procent}%, rgba(0,0,0,0.1) ${procent}%)`;
    },
    getCurrentExpression(state) {
      return state.expression;
    },
    getParamAlert(state) {
      return state.alert;
    }
  },
  mutations: {
    UPDATE_STOPWATCH(state, payload) {
      state.stopWatch = payload;
    },
    UPDATE_TIMELEFT(state, payload) {
      state.timeLeft = payload;
    },
    UPDATE_GAMEDIFF(state, payload) {
      state.gameDifficulty = payload;
    },
    UPDATE_OPERATIONS(state, payload) {
      state.mathOperations = payload;
    },
    ADD_RESULT(state, payload) {
      state.result.push(payload);
    },
    SET_RESULT(state, payload) {
      state.result = payload;
    },
    SET_TYPEALERT(state, payload) {
      state.alert = payload;
    },
    UPDATE_EXPRESSION(state, payload) {
      state.expression = payload;
    }
  },
  actions: {
    endGame({ commit, state }) {
      if (state.stopWatch > 0) {
        commit('ADD_RESULT', '-');
      }
      const stopWatch = state.timeLeft * 60;
      commit('UPDATE_STOPWATCH', stopWatch);
    },
    decrementStopWatch({ commit, state }) {
      commit('UPDATE_STOPWATCH', state.stopWatch - 1);
    },
    changeTimeLeft({ commit }, payload) {
      commit('UPDATE_TIMELEFT', payload);
      commit('UPDATE_STOPWATCH', payload * 60);
    },
    changeGameDifficulty({ commit }, payload) {
      commit('UPDATE_GAMEDIFF', payload);
    },
    changeOperations({ commit }, payload) {
      commit('UPDATE_OPERATIONS', payload);
    },
    setTypeAlert({ commit }, color) {
      commit('SET_TYPEALERT', color);
      setTimeout(() => commit('SET_TYPEALERT', ''), 300);
    },
    updateInputField({ commit, state }, payload) {
      const currentExpression = state.expression;
      let newValue;

      switch (payload) {
        case 'erase':
          newValue = (state.expression[2] + '').slice(0, -1);
          break;
        case 'clear':
          newValue = '';
          break;
        default:
          newValue = currentExpression[2] + payload;
          break;
      }

      const newExpression = [
        currentExpression[0],
        currentExpression[1],
        newValue,
        currentExpression[3]
      ];

      commit('UPDATE_EXPRESSION', newExpression);
    },
    startGame({ commit, dispatch }) {
      commit('SET_RESULT', []);
      dispatch('newExpression');
    },
    newExpression({ commit, state }) {
      const random = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      };

      const k = parseInt(state.gameDifficulty);
      const operation =
        state.mathOperations[random(1, state.mathOperations.length) - 1];
      let a;
      let b;
      let c;
      switch (operation) {
        case '+':
          a = random(1, Math.pow(10, k));
          b = random(1, Math.pow(10, k));
          c = a + b;
          break;
        case '-':
          a = random(1, Math.pow(10, k));
          b = random(1, Math.pow(10, k));
          c = a - b;
          break;
        case '*':
          a = random(1, 10 * k);
          b = random(1, 10 * k);
          c = a * b;
          break;
        case '/':
          a = random(1, 10 * k);
          b = random(1, 10 * k);
          c = a * b;
          [a, c] = [c, a];
          break;
        case '^':
          a = random(1, 9 + k);
          b = random(2, 4);
          c = Math.pow(a, b);
          break;
        default:
          c = 0;
          break;
      }
      commit('UPDATE_EXPRESSION', [a, operation, '', c]);
    },
    checkExpression({ commit, state, dispatch }) {
      const parts = [...state.expression];
      const a = parseFloat(parts[0]);
      const b = parseFloat(parts[2]);
      const c = parseFloat(parts[3]);
      let result;

      switch (parts[1]) {
        case '+':
          result = a + b == c;
          break;
        case '-':
          result = a - b == c;
          break;
        case '/':
          result = a / b == c;
          break;
        case '*':
          result = a * b == c;
          break;
        case '^':
          result = Math.pow(a, b) == c;
          break;
        default:
          result = false;
          break;
      }

      if (result) {
        dispatch('setTypeAlert', 'success');
        commit('ADD_RESULT', '+');
        dispatch('newExpression');
      } else {
        dispatch('setTypeAlert', 'error');
      }
    },
    liveExpression({ commit, dispatch }) {
      commit('ADD_RESULT', '-');
      dispatch('newExpression');
    }
  }
});
