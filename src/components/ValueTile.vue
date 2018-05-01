<template>
  <Tile
    :width="width"
    :height="height"
    :title="title">
    <div>
      <span class="value">{{ value.toFixed(2) }}</span>
      <span
        v-if="unit"
        class="unit"
        v-html="unit"/>
    </div>
    <PercentileChange :value="20"/>
  </Tile>
</template>

<script>
import Tile from './Tile.vue';
import PercentileChange from './PercentileChange.vue';

export default {
  components: {
    Tile,
    PercentileChange,
  },

  extends: Tile,

  props: {
    value: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/styles/vars.scss";

  .value {
    font-size: 2em;
    font-weight: bold;
  }
  .unit {
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
