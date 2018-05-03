<template>
  <Tile
    :width="width"
    :height="height"
    :title="title">
    <div>
      <Average
        :data="concatDataNoZeros"
        :decimal-places="decimalPlaces"
        class="value"
      />
      <span
        v-if="unit"
        class="unit"
        v-html="unit"/>
    </div>
    <PercentileChange :value="20"/>
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
    decimalPlaces: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: null,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    concatDataNoZeros() {
      return this.data.reduce((sum, data) => ({
        data: sum.data.concat(data.data.filter(b => b.y > 1)),
      }), { data: [] }).data;
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
