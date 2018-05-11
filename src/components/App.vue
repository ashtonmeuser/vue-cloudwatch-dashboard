<template>
  <div id="app">
    <ValueTile
      :value="messagesPerHour"
      :decimal-places="0"
      unit="/hr"
      title="MQTT Messages"
      color="#3f906b">
      <template slot="before">
        <EngrInt :value="messagesPerHour * 24 * 30.5"/> proj.
      </template>
      <template slot="after">
        <PercentileChange :value="messagesPerHour"/>
      </template>
    </ValueTile>
    <Tile
      title="Dynamo DB"
      color="#3f906b">
      <LabelledRatio
        :numerator="service.datasets.ided('dynamoConsumedWrite').latest(3).max()"
        :denominator="service.datasets.ided('dynamoProvisionedWrite').latest(3).max()"
        label="WCU"
      />
      <LabelledRatio
        :numerator="service.datasets.ided('dynamoConsumedRead').latest(3).max()"
        :denominator="service.datasets.ided('dynamoProvisionedRead').latest(3).max()"
        label="RCU"
      />
    </Tile>
    <ChartTile
      :datasets="service.datasets.tagged('spotify')"
      :width="2"
      :height="2"
      title="Spotify Search"
      color="#3f906b"
    />
    <ValueTile
      :value="percentErrorRate"
      :decimal-places="2"
      title="Errors"
      color="#3f906b"
      unit="%ER">
      <template slot="before">
        {{ service.datasets.tagged('errors').sum() }} total
      </template>
      <template slot="after">
        <PercentileChange :value="percentErrorRate"/>
      </template>
    </ValueTile>
    <ValueTile
      :value="service.datasets.tagged('duration').noZeros().average()"
      title="Avg. Duration"
      color="#3f906b"
      unit="ms">
      <template slot="before">
        {{ service.datasets.tagged('duration').max().toFixed(0) }}ms max.
      </template>
      <template slot="after">
        <PercentileChange :value="service.datasets.tagged('duration').noZeros().average()"/>
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
import EngrInt from './EngrInt.vue';
import LabelledRatio from './LabelledRatio.vue';
import RelativeDate from './RelativeDate.vue';
import CloudWatchService from '../services/CloudWatchService';
import metrics from '../metrics.json';

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
    EngrInt,
    LabelledRatio,
    RelativeDate,
  },

  data: () => ({
    service: new CloudWatchService(cloudWatchServiceOptions, metrics),
    task: null,
    percentErrorRate: NaN,
    messagesPerHour: NaN,
  }),

  watch: {
    service: {
      handler() {
        this.messagesPerHour = (this.service.datasets.tagged('mqtt').sum() * 60) / this.service.backfillMinutes;
        this.percentErrorRate = (this.service.datasets.tagged('errors').sum() / this.service.datasets.tagged('invocations').sum()) * 100;
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
    grid-auto-flow: row dense;
    background-color: $background-color;
    @media only screen and (min-width: $small) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .updated {
    font: 1em "Nunito";
    padding-right: 1em;
    line-height: 1.5em;
    color: $secondary-font;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
