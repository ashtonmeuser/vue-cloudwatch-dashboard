<template>
  <div
    :style="style"
    class="tile">
    <div
      :style="{backgroundColor: color}"
      class="title"
      v-text="title"
    />
    <div class="body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 1,
      validator: value => (value <= 2 && value >= 1),
    },
    height: {
      type: Number,
      default: 1,
      validator: value => (value <= 2 && value >= 1),
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#8c8c8c',
    },
  },

  computed: {
    style() {
      return `grid-area: span ${this.width} / span ${this.width}`;
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/styles/vars.scss";
  .tile {
    font: 1em "Nunito";
    color: white;
    border-radius: 0.5em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: $tile-color;
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    padding: 0.5em;
  }
  .body {
    overflow: hidden;
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
  }
</style>
