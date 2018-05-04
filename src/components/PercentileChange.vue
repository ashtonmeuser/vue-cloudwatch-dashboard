<template>
  <span
    :class="trend"
    class="change">
    <span v-html="indicator"/> {{ Math.abs(percent).toFixed(1) }}%
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    percentThreshold: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      percent: 0,
      trend: 'even',
    };
  },

  computed: {
    indicator() {
      if (Math.abs(this.percent) < this.percentThreshold) {
        return '&#x25cf;';
      }
      return this.percent > 0 ? '&#9650;' : '&#9660;';
    },
  },

  watch: {
    value(newValue, oldValue) {
      const percent = ((newValue - oldValue) / oldValue) * 100;
      this.percent = percent !== Infinity && !Number.isNaN(percent) ? percent : 0;
      if (Math.abs(this.percent) < this.percentThreshold) {
        this.trend = 'even';
      } else {
        this.trend = this.percent > 0 ? 'up' : 'down';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/styles/vars.scss";
  .up {
    color: $green;
  }
  .down {
    color: $red;
  }
  .even {
    color: $yellow;
  }
</style>
