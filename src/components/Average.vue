<template>
  <span>{{ average.toFixed(decimalPlaces) }}</span>
</template>

<script>
export default {
  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
    decimalPlaces: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    mergedDataNoZeros() {
      return this.datasets.reduce((merged, dataset) => (
        merged.concat(dataset.data.filter(d => d.y > 0))
      ), []);
    },
    average() {
      const noZeros = this.mergedDataNoZeros;
      return noZeros
        .reduce((sum, data) => sum + data.y, 0) / noZeros.length;
    },
  },
};
</script>
