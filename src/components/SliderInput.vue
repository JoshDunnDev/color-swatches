<template>
  <div>
    <div>{{ title }}</div>
    <div class="input-container">
      <input
        class="slider"
        type="range"
        min="0"
        max="100"
        :value="value"
        @input="handleInput"
      />
      <input
        class="number"
        type="number"
        :value="value"
        :style="errorStyle(error)"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderInput",
  props: {
    title: String,
    value: [String, Number],
    checkErrors: Function,
    error: Boolean
  },
  methods: {
    // Function to handle input events and emit the updated value
    handleInput(e) {
      this.$emit("input", e.target.value);
      this.checkErrors();
    },
    // Function to define error styles based on the presence of an error
    errorStyle(error) {
      if (!error) return;
      return {
        backgroundColor: "lightpink",
        borderColor: "red"
      };
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider {
  width: 210px;
}

.number {
  width: 24px;
  padding: 4px;
}

/* Remove number input arrows in some browsers */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
