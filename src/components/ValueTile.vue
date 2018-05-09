<template>
  <Tile
    :width="width"
    :height="height"
    :title="title"
    :color="color">
    <div class="detail">
      <slot name="before"/>
    </div>
    <div class="value">
      <Value
        :value="value"
        :unit="unit"
        :precision="precision"
      />
    </div>
    <div class="detail">
      <slot name="after"/>
    </div>
  </Tile>
</template>

<script>
import Value from './Value.vue';
import Tile from './Tile.vue';

export default {
  components: {
    Value,
    Tile,
  },

  extends: Tile,

  props: {
    value: {
      type: Number,
      default: NaN,
    },
    precision: {
      type: Number,
      default: 3,
    },
    unit: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/styles/vars.scss";
  .value {
    font-size: 2em;
    font-weight: bold;
    /deep/ .unit {
      font-size: 0.4em;
    }
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
</style>
