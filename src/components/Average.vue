<template>
  <span>{{ average.toFixed(decimalPlaces) }}</span>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    decimalPlaces: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    average() {
      return this.data.reduce((sum, data) => sum + data.y, 0) / this.data.length;
    },
  },
};
</script>
