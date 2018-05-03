<template>
  <div id="app">
    <Tile title="Tile 1"/>
    <ValueTile
      :data="tags('duration')"
      :decimal-places="0"
      title="Duration"
      unit="ms"
    />
    <ChartTile
      :width="2"
      :height="2"
      title="Tile 3"
    />
    <ChartTile
      :data="tags('duration')"
      :width="2"
      :height="2"
      title="Duration"
    />
    <ChartTile
      :data="tags('invocations')"
      :width="2"
      :height="2"
      title="Invocations"
    />
    <ValueTile
      title="Tile 6"
      unit="&#176;C"
    />
    <ValueTile
      title="Tile 7"
      unit="&#176;C"
    />
  </div>
</template>

<script>
import Tile from './Tile.vue';
import ValueTile from './ValueTile.vue';
import ChartTile from './ChartTile.vue';
import CloudWatchService from '../services/CloudWatchService';
import metrics from '../metrics.json';

const cloudWatchServiceOptions = {
  periodMinutes: 5,
  backfillMinutes: 2 * 60,
};

export default {
  name: 'App',

  components: {
    Tile,
    ValueTile,
    ChartTile,
  },

  data: () => ({
    service: new CloudWatchService(cloudWatchServiceOptions, metrics),
    task: null,
  }),

  created() {
    this.update();
    this.task = setInterval(this.update, this.service.periodMinutes * 60000);
  },

  beforeDestroy() {
    clearInterval(this.task);
  },

  methods: {
    async update() {
      this.data = await this.service.update();
    },
    tags(tags) {
      return this.service.data.filter((d) => {
        if (!Array.isArray(d.tags)) {
          return false; // No tags for data
        } else if (Array.isArray(tags)) {
          return [...new Set([...d.tags, ...tags])].length > 0; // Arrays share element
        }
        return d.tags.includes(tags); // String in tags
      });
    },
  },
};
</script>

<style src="normalize.css/normalize.css"></style>
<style scoped lang="scss">
  @import "~@/styles/vars.scss";
  #app {
    box-sizing: border-box;
    padding: 1em;
    min-height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(150px, 1fr);
    grid-gap: 1em;
    background-color: $background-color;
    @media only screen and (min-width: $break-point) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
