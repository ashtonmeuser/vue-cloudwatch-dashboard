<script>
import { Line, mixins } from 'vue-chartjs';
import ObjectAssignDeep from 'object-assign-deep';

const chartOptions = {
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
      ticks: {
        fontColor: 'white',
      },
    }],
    yAxes: [{
      id: 'primary',
      position: 'left',
      color: 'white',
      gridLines: {
        zeroLineColor: 'transparent',
        drawBorder: false,
        color: 'rgba(255, 255, 255, 0.05)',
      },
      ticks: {
        fontColor: 'white',
        callback: value => (Math.floor(value) === value ? value : null),
      },
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
    secondaryAxis: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    options() {
      const options = ObjectAssignDeep({}, chartOptions);
      if (this.secondaryAxis) {
        options.scales.yAxes[1] = {
          id: 'secondary',
          position: 'right',
          color: 'white',
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false,
            color: 'rgba(255, 255, 255, 0.05)',
          },
          ticks: {
            fontColor: 'white',
            callback: value => (Math.floor(value) === value ? value : null),
          },
        };
      }
      return options;
    },
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
