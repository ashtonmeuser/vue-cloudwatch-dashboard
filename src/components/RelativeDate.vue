<template>
  <span v-text="friendly"/>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: null,
    },
  },

  data: () => ({
    now: Date.now(),
    task: null,
  }),

  computed: {
    friendly() {
      if (this.date === null) {
        return 'never';
      }
      const delta = Math.round(this.now - this.date) / 1000;

      if (delta < 30) {
        return 'just now';
      } else if (delta < 2 * 60) {
        return 'a minute ago';
      } else if (delta < 60 * 60) {
        return `${Math.floor(delta / 60)} minutes ago`;
      } else if (delta < 2 * 60 * 60) {
        return 'an hour ago';
      } else if (delta < 2 * 24 * 60 * 60) {
        return `${Math.floor(delta / (60 * 60))} hours ago`;
      }
      return `${Math.floor(delta / (60 * 60 * 24))} days ago`;
    },
  },

  created() {
    this.task = setInterval(() => { this.now = Date.now(); }, 10000);
  },

  beforeDestroy() {
    clearInterval(this.task);
  },
};
</script>
