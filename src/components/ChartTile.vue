<template>
  <Tile
    :width="width"
    :height="height"
    :title="title">
    <LineChart class="chart-holder"/>
  </Tile>
</template>

<script>
import Tile from './Tile.vue';
import LineChart from './charts/LineChart.vue';

export default {
  components: {
    Tile,
    LineChart,
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
  .chart-holder {
    position: absolute;
    padding: 0.5em;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
