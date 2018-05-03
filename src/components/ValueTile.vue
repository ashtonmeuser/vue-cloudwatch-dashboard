<template>
  <Tile
    :width="width"
    :height="height"
    :title="title">
    <slot name="before"/>
    <div>
      <span class="value">
        <slot name="value"/>
      </span>
      <span
        v-if="unit"
        class="unit"
        v-html="unit"/>
    </div>
    <slot name="after"/>
  </Tile>
</template>

<script>
import Tile from './Tile.vue';
import Average from './Average.vue';
import PercentileChange from './PercentileChange.vue';

export default {
  components: {
    Tile,
    Average,
    PercentileChange,
  },

  extends: Tile,

  props: {
    unit: {
      type: String,
      default: null,
    },
    data: {
      type: Array,
      default: () => [],
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
  .unit {
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
