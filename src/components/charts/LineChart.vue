<script>
import { Line, mixins } from 'vue-chartjs';

const options = {
  animation: {
    duration: 0,
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: false,
  },
  legend: {
    labels: {
      boxWidth: 12,
      fontColor: 'white',
    },
  },
  scales: {
    xAxes: [{
      color: 'white',
      type: 'time',
      gridLines: {
        zeroLineColor: 'transparent',
        drawBorder: false,
        color: 'rgba(255, 255, 255, 0.05)',
      },
      ticks: { fontColor: 'white' },
    }],
    yAxes: [{
      color: 'white',
      gridLines: {
        zeroLineColor: 'transparent',
        drawBorder: false,
        color: 'rgba(255, 255, 255, 0.05)',
      },
      ticks: { fontColor: 'white' },
    }],
  },
  elements: {
    line: {
      borderWidth: 2,
      backgroundColor: 'transparent',
    },
    point: {
      radius: 0,
      hoverRadius: 0,
      hitRadius: 0,
    },
  },
  events: [],
};

export default {
  extends: Line,

  mixins: [mixins.reactiveProp],

  props: {
    chartData: {
      type: Object,
      default: () => ({ datasets: [] }),
    },
    options: {
      type: Object,
      default: () => options,
    },
  },

  mounted() {
    this.renderChart(this.chartData, options);
  },
};
</script>
