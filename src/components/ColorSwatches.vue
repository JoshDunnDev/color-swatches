<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="input-container">
      <div class="progress">
        <ProgressBar
          v-if="loading"
          :currentBatch="currentBatch"
          :totalBatches="totalBatches"
        />
      </div>
      <Inputs
        class="inputs"
        :formData="formData"
        :onClickButton="onClickButton"
        :checkErrors="checkErrors"
        :loading="loading"
        :errors="errors"
      />
      <div class="spacer"></div>
    </div>
    <div class="content-container" v-if="swatches.length">
      <Swatch v-for="swatch in swatches" :key="swatch.id" :swatch="swatch" />
    </div>
  </div>
</template>

<script>
import Swatch from "./Swatch";
import Inputs from "./Inputs";
import ProgressBar from "./ProgressBar";
import { getBatches } from "../utils/helpers";
import { debounce } from "lodash";

export default {
  name: "ColorSwatches",
  components: {
    Swatch,
    Inputs,
    ProgressBar
  },
  data() {
    return {
      title: "Color Swatches",
      swatches: [],
      formData: {
        saturation: 100,
        lightness: 50
      },
      loading: false,
      currentBatch: 0,
      totalBatches: 0,
      errors: {
        saturation: false,
        lightness: false
      }
    };
  },
  methods: {
    // Function to fetch color swatches data
    async getSwatches() {
      this.swatches = [];
      this.currentBatch = 0;
      this.loading = true;
      const batches = getBatches({
        saturation: this.formData.saturation,
        lightness: this.formData.lightness
      });
      this.totalBatches = batches.length;

      for (const [index, batch] of batches.entries()) {
        const results = await Promise.all(batch);
        for (const result of results) {
          const isSwatchesEmpty = this.swatches.length === 0;
          const lastIndex = this.swatches.length - 1;
          const isNewName =
            !isSwatchesEmpty &&
            this.swatches[lastIndex].name !== result.data.name.value;

          if (isSwatchesEmpty || isNewName) {
            this.swatches.push({
              id: result.data.hex.clean,
              name: result.data.name.value,
              hex: result.data.name.closest_named_hex
            });
          }
        }
        if (index + 1 === batches.length) {
          this.currentBatch = batches.length;
          this.loading = false;
        } else {
          this.currentBatch += 1;
        }
        continue;
      }
    },

    // Function to handle button click
    onClickButton() {
      if (!this.errors.saturation && !this.errors.lightness) {
        this.getSwatches();
      }
    },

    // Function to validate input values
    checkErrors() {
      const { saturation, lightness } = this.formData;

      this.errors.saturation = !(
        parseInt(saturation) >= 0 && parseInt(saturation) <= 100
      );
      this.errors.lightness = !(
        parseInt(lightness) >= 0 && parseInt(lightness) <= 100
      );
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
.input-container {
  display: flex;
}

.content-container {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.progress {
  display: flex;
  justify-content: start;
  align-items: end;
  order: 1;
  flex: 1;
}

.progress div {
  margin-top: 10px;
}

.inputs {
  order: 2;
}

.spacer {
  content: "";
  flex: 1;
  order: 3;
}

@media (max-width: 825px) {
  .input-container {
    flex-direction: column;
    align-items: center;
  }

  .spacer {
    order: 1;
  }

  .progress {
    order: 3;
  }

  .content-container {
    justify-content: center;
  }
}
</style>
