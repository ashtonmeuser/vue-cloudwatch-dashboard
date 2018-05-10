<template>
  <Tile
    :width="width"
    :height="height"
    :title="title"
    :color="color">
    <LineChart
      :chart-data="chartData"
      :secondary-axis="secondaryAxis"
      class="chart-holder"
    />
  </Tile>
</template>

<script>
import Tile from './Tile.vue';
import LineChart from './LineChart.vue';
import DatasetArray from '../services/DatasetArray';

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
      type: Object,
      default: () => new DatasetArray(),
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
          yAxisID: data.secondaryAxis ? 'secondary' : 'primary',
          borderWidth: 2,
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
          pointBackgroundColor: colors[index % colors.length],
        })),
      };
    },
    secondaryAxis() {
      return this.datasets.some(data => data.secondaryAxis);
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
