<template>
  <div class="container">
    <div class="swatch" :style="swatchStyle"></div>
    <div class="text">{{ swatch.name }}</div>
    <div class="text">{{ rgbValue }}</div>
  </div>
</template>

<script>
import { hexToRgb } from "../utils/helpers";
export default {
  name: "Swatch",
  props: {
    swatch: Object
  },
  computed: {
    swatchStyle() {
      // Compute the style object for the swatch
      const style = {
        backgroundColor: this.swatch.hex
      };
      if (this.swatch.hex === "#FFFFFF") {
        // Add a black border if the swatch is white
        style.border = "1px solid black";
      }
      return style;
    },
    rgbValue() {
      return hexToRgb(this.swatch.hex);
    }
  }
};
</script>

<style scoped>
.container {
  width: 125px;
  height: 171px;
  display: flex;
  flex-direction: column;
  align-content: start;
  align-self: self-start;
}
.swatch {
  width: 125px;
  flex: 1;
  margin-bottom: 10px;
}

.text {
  text-align: center;
}
</style>
