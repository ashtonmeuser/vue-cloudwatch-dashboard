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
      :width="2"
      :height="2"
      title="Tile 5"
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

export default {
  name: 'App',
  components: {
    Tile,
    ValueTile,
    ChartTile,
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
