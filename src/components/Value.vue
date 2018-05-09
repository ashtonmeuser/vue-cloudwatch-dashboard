<template>
  <span>
    {{ numberAndUnit[0] }}<span
      class="unit"
      v-html="numberAndUnit[1]"
    />
  </span>
</template>

<script>
const prefixes = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

export default {
  props: {
    value: {
      type: Number,
      default: NaN,
    },
    precision: {
      type: Number,
      default: 3,
    },
    unit: {
      type: String,
      default: '',
    },
  },

  computed: {
    numberAndUnit() {
      if (Number.isNaN(this.value)) {
        return ['NaN', this.unit];
      }
      const expString = this.value.toExponential();
      const [sig, exp] = expString.split('e').map(Number);
      const engr = Math.floor(exp / 3) * 3;
      const base = (sig * (10 ** (exp - engr))).toPrecision(this.precision);
      const prefix = prefixes[(engr / 3) + 8];
      if (typeof prefix === 'undefined') {
        return [`${sig.toPrecision(this.precision)}e${exp}`, this.unit];
      }
      return [base, `${prefix}${this.unit}`];
    },
  },
};
</script>
