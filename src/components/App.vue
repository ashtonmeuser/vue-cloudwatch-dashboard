<template>
  <div id="app">
    <Tile
      title="Tile 1"
      color="#3f906b"
    />
    <ValueTile
      :value="messagesPerMinute"
      :decimal-places="2"
      unit="/hr"
      title="MQTT Messages"
      color="#3f906b">
      <template slot="before">
        {{ messagesProjection }} proj.
      </template>
    </ValueTile>
    <ChartTile
      :datasets="service.datasets.tagged('errors')"
      :width="2"
      :height="2"
      title="Lambda Errors"
      color="#3f906b"
    />
    <ValueTile
      :value="percentErrorRate"
      :decimal-places="2"
      title="Errors"
      color="#3f906b"
      unit="%ER">
      <template slot="before">
        {{ service.datasets.tagged('errors').sum() }} error(s) total
      </template>
      <template slot="after">
        <PercentileChange :value="percentErrorRate"/>
      </template>
    </ValueTile>
    <ValueTile
      :value="service.datasets.tagged('duration').average()"
      title="Avg. Duration"
      color="#3f906b"
      unit="ms">
      <template slot="before">
        Hi!
      </template>
      <template slot="after">
        <PercentileChange :value="service.datasets.tagged('duration').average()"/>
      </template>
    </ValueTile>
    <ChartTile
      :datasets="service.datasets.tagged('duration')"
      :width="2"
      :height="2"
      title="Lambda Duration"
      color="#3f906b"
    />
    <ChartTile
      :datasets="service.datasets.tagged('invocations')"
      :width="2"
      :height="2"
      title="Lambda Invocations"
      color="#3f906b"
    />
    <div class="updated">
      Updated <RelativeDate :date="service.updatedAt"/>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue';
import ValueTile from './ValueTile.vue';
import ChartTile from './ChartTile.vue';
import PercentileChange from './PercentileChange.vue';
import RelativeDate from './RelativeDate.vue';
import CloudWatchService from '../services/CloudWatchService';
import metrics from '../metrics.json';

const monthInMinutes = 30.5 * 24 * 60;
const cloudWatchServiceOptions = {
  periodMinutes: 5,
  backfillMinutes: 2 * 60,
  refreshMinutes: 5,
};

export default {
  name: 'App',

  components: {
    Tile,
    ValueTile,
    ChartTile,
    PercentileChange,
    RelativeDate,
  },

  data: () => ({
    service: new CloudWatchService(cloudWatchServiceOptions, metrics),
    task: null,
    percentErrorRate: NaN,
    messagesProjection: NaN,
    messagesPerMinute: NaN,
  }),

  watch: {
    service: {
      handler() {
        this.messagesPerMinute = this.service.datasets.tagged('mqtt').sum() / (this.service.periodMinutes * 60);
        this.percentErrorRate = (this.service.datasets.tagged('errors').sum() / this.service.datasets.tagged('invocations').sum()) * 100;
        this.messagesProjection = this.service.datasets.tagged('mqtt').sum() * (monthInMinutes / this.service.backfillMinutes);
      },
      deep: true,
    },
  },

  beforeDestroy() {
    this.service.stop();
  },
};
</script>

<style src="normalize.css/normalize.css"></style>
<style scoped lang="scss">
  @import "~@/styles/vars.scss";
  #app {
    position: relative;
    box-sizing: border-box;
    padding: 1em 1em 1.5em 1em;
    min-height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(150px, 1fr);
    grid-gap: 1em;
    background-color: $background-color;
    @media only screen and (min-width: $small) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .updated {
    font: 1em "Nunito";
    padding: 0 1em 0.2em 0;
    color: $secondary-font;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
