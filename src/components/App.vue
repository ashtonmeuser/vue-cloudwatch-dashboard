<template>
  <div id="app">
    <Tile title="Tile 1"/>
    <Tile title="Tile 2"/>
    <ChartTile
      :width="2"
      :height="2"
      title="Tile 3"
    />
    <ChartTile
      :width="2"
      :height="2"
      title="Tile 4"
    />
    <ChartTile
      :data="service.data"
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

const metrics = [
  {
    label: 'Notify',
    dimensionName: 'FunctionName',
    dimensionValue: 'ama-prod-notify',
    name: 'Invocations',
    namespace: 'AWS/Lambda',
  },
  {
    label: 'Vote',
    dimensionName: 'FunctionName',
    dimensionValue: 'ama-prod-vote',
    name: 'Invocations',
    namespace: 'AWS/Lambda',
  },
  {
    label: 'Create',
    dimensionName: 'FunctionName',
    dimensionValue: 'ama-prod-create',
    name: 'Invocations',
    namespace: 'AWS/Lambda',
  },
];
const options = {
  periodMinutes: 5,
  backfillMinutes: 120,
};

export default {
  name: 'App',

  components: {
    Tile,
    ValueTile,
    ChartTile,
  },

  data: () => ({
    service: new CloudWatchService(options, metrics),
    task: null,
  }),

  computed: {
    // invocations() {
    //   return this.service.data.filter(d => d.group === 'invocations')
    // }
  },

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
