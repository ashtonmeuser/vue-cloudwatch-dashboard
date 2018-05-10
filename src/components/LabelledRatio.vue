<template>
  <div
    class="container">
    <div v-html="label"/>
    <div>
      <span :class="status" class="numerator" v-text="numerator"/>/<span v-html="denominator"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    numerator: {
      type: Number,
      default: NaN,
    },
    denominator: {
      type: Number,
      default: NaN,
    },
    ratioThreshold: {
      type: Number,
      default: 0.2,
    },
  },

  computed: {
    status() {
      const ratio = this.numerator / this.denominator;
      if (Math.abs(ratio - 1) <= this.ratioThreshold) {
        return 'warning';
      }
      return ratio > 1 ? 'critical' : 'ok';
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/styles/vars.scss";
  .ok {
    color: $green;
  }
  .critical {
    color: $red;
  }
  .warning {
    color: $yellow;
  }
  .container {
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-sizing: border-box;
    @media only screen and (min-width: $small) {
      padding: 0 1em;
    }
    div {
      flex-grow: 1;
      flex-basis: 0;
    }
    div:last-child {
      text-align: right;
    }
  }
  .numerator {
    font-weight: bold;
    font-size: 2em;
  }
</style>
