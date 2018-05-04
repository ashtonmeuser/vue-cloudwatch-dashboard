<template>
  <Tile
    :width="width"
    :height="height"
    :title="title">
    <span class="detail">
      <slot name="before"/>
    </span>
    <div>
      <span
        class="value"
        v-html="value.toFixed(decimalPlaces)"
      />
      <span
        v-if="unit"
        class="unit"
        v-html="unit"/>
    </div>
    <span class="detail">
      <slot name="after"/>
    </span>
  </Tile>
</template>

<script>
import Tile from './Tile.vue';

export default {
  components: {
    Tile,
  },

  extends: Tile,

  props: {
    value: {
      type: Number,
      default: NaN,
    },
    decimalPlaces: {
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
    @media only screen and (min-width: $small) {
      font-size: 3em;
    }
    @media only screen and (min-width: $large) {
      font-size: 5em;
    }
  }
  .detail {
    color: $secondary-font;
  }
  .unit {
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
