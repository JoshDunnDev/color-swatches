<template>
  <div class="container">
    <SliderInput
      v-model="formData.saturation"
      title="Saturation"
      :checkErrors="checkErrors"
      :error="errors.saturation"
    />
    <SliderInput
      v-model="formData.lightness"
      title="Lightness"
      :checkErrors="checkErrors"
      :error="errors.lightness"
    />
    <button
      v-on:click="onClickButton"
      :disabled="loading || errors.saturation || errors.lightness"
    >
      Get Swatches
    </button>
  </div>
</template>

<script>
import SliderInput from "./SliderInput";
export default {
  name: "Inputs",
  components: { SliderInput },
  props: {
    formData: Object,
    onClickButton: Function,
    loading: Boolean,
    checkErrors: Function,
    errors: Object
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
  width: 200px;
}

.number {
  width: 25px;
  padding: 4px;
}

button {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: dodgerblue;
  border: 0;
  box-shadow: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: hsl(210, 100%, 40%);
}

button:disabled,
button[disabled] {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

/* Remove number input arrows in some browsers */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
