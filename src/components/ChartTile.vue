<template>
  <Tile
    :width="width"
    :height="height"
    :title="title">
    <LineChart
      :chart-data="chartData"
      class="chart-holder"/>
  </Tile>
</template>

<script>
import Tile from './Tile.vue';
import LineChart from './charts/LineChart.vue';

const colors = [
  '#4D9DE0',
  '#E15554',
  '#E1BC29',
  '#3BB273',
  '#7768AE',
  '#CF8BA9',
  '#E28413',
  '#FCB0B3',
  '#23F0C7',
  '#870058',
];

export default {
  components: {
    Tile,
    LineChart,
  },

  extends: Tile,

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    chartData() {
      return {
        datasets: this.datasets.map((data, index) => ({
          label: data.label,
          data: data.data,
          lineTension: 0.3,
          fill: false,
          borderWidth: 2,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
          pointBackgroundColor: colors[index % colors.length],
        })),
      };
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
