<template>
  <div class="card">
    <div class="card-body">
      <header>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="changeComponent"
        >
          Отмена
        </button>
        <div
          class="timer"
          style="background: linear-gradient(270deg, rgb(0, 123, 255)15%, rgba(0,0,0,0.1) 15%);"
        >
          4:37
        </div>
      </header>
      <div class="instance">
        <div class="sample"><span>13</span> * __</div>
        <div class="result">
          = 84240?
        </div>
      </div>
      <div class="calculation pt-4">
        <div class="row">
          <div class="col">
            <button>1</button>
          </div>
          <div class="col">
            <button>2</button>
          </div>
          <div class="col">
            <button>3</button>
          </div>
          <div class="col">
            <button class="bg-grey">&lt;</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button>4</button>
          </div>
          <div class="col">
            <button>5</button>
          </div>
          <div class="col">
            <button>6</button>
          </div>
          <div class="col">
            <button class="bg-grey">&gt;</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button>7</button>
          </div>
          <div class="col">
            <button>8</button>
          </div>
          <div class="col">
            <button>9</button>
          </div>
          <div class="col">
            <button class="bg-grey">?</button>
          </div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <button>0</button>
          </div>
          <div class="col"></div>
          <div class="col">
            <button class="bg-grey">=</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeComponent() {
      this.$emit('show', 'Home');
    }
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
  font-size: 2rem;
  padding-left: 10rem;
  padding-top: 2rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
}

.sample > span {
  color: black;
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
</style>
