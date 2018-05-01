<template>
  <span
    :class="trend"
    class="change">
    <span v-html="indicator"/> {{ Math.abs(percent) }}%
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
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
      if (Math.abs(this.percent) < 1) {
        return '&#x25cf;';
      }
      return this.percent > 0 ? '&#9650;' : '&#9660;';
    },
  },

  watch: {
    value: (newValue, oldValue) => {
      const percent = Math.round(((newValue - oldValue) / oldValue) * 100);
      this.percent = percent !== Infinity && typeof percent === 'number' ? percent : 0;
      if (Math.abs(this.percent) < 1) {
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
