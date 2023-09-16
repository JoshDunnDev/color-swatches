<template>
  <div>
    <div>Loading Results</div>
    <div class="animated-progress progress-blue">
      <div :style="'width:' + currentPercent + '%'">{{ currentPercent }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    currentBatch: Number,
    totalBatches: Number
  },
  computed: {
    currentPercent() {
      // Calculate the completion percentage based on the current batch and total batches
      return Math.floor((this.currentBatch / this.totalBatches) * 100);
    }
  }
};
</script>

<style scoped>
.animated-progress {
  margin-top: 4px;
  width: 260px;
  height: 20px;
  background-color: lightgrey;
  border-radius: 10px;
  overflow: hidden;
}

.animated-progress div {
  color: white;
  line-height: 20px;
  padding: 0 5px;
}

.progress-blue div {
  background-color: dodgerblue;
  text-align: center;
  /* Transition effect for smooth width changes */
  transition: all 0.25s linear;
}
</style>
