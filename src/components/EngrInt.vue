<template>
  <span v-html="formatted"/>
</template>

<script>
const prefixes = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

export default {
  props: {
    value: {
      type: Number,
      default: NaN,
    },
  },

  computed: {
    formatted() {
      if (Number.isNaN(this.value)) {
        return NaN;
      }
      const expString = this.value.toExponential();
      const [sig, exp] = expString.split('e').map(Number);
      const engr = Math.floor(exp / 3) * 3;
      const base = (sig * (10 ** (exp - engr)));
      const prefix = prefixes[(engr / 3) + 8];
      return `${base.toFixed(0)}${prefix}`;
    },
  },
};
</script>
