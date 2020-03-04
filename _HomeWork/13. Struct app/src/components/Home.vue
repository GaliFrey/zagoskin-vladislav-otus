<template>
  <div class="card">
    <div class="card-body">
      <h2>Привет!</h2>
      <p>
        Добро пожаловать на 24 тренировочный день,<br />
        Ваш последний результат - решено 10 из 25.<br />
        Общая точность 80%
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
          />
          <label for="timer">Длительность 7 минут</label>

          <input
            type="range"
            class="custom-range"
            min="1"
            max="10"
            id="strange"
          />
          <label for="strange">Сложность 5</label>
        </div>
        <div class="form-group">
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck1"
            />
            <label class="custom-control-label" for="customCheck1"
              >Суммирование</label
            >
          </div>

          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck2"
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
            />
            <label class="custom-control-label" for="customCheck5"
              >Возведение в степень</label
            >
          </div>
        </div>
      </form>
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="changeComponent"
      >
        Играть
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeComponent() {
      this.$emit('show', 'Game');
    }
  }
};
</script>

<style>
form {
  width: 16rem;
  position: relative;
}

button {
  float: right;
}
</style>
