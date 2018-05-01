<script>
import { Line } from 'vue-chartjs';
import CloudWatchService from '../../services/CloudWatchService';

const worker = new CloudWatchService([
  {
    label: 'Notify',
    dimensionName: 'FunctionName',
    dimensionValue: 'ama-prod-notify',
    name: 'Invocations',
    namespace: 'AWS/Lambda',
  },
]);

export default {
  extends: Line,

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  emptyDataSets() {
    return [];
  },

  mounted() {
    const color = '#F00';
    const data = {
      datasets: [
        {
          label: 'GitHub Commits',
          data: [
            {
              t: '2018-05-01T16:30:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T16:35:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T16:40:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T16:45:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T16:50:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T16:55:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:00:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:05:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:10:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:15:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:20:00.000Z',
              y: 2,
            },
            {
              t: '2018-05-01T17:25:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:30:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:35:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:40:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:45:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:50:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T17:55:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T18:00:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T18:05:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T18:10:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T18:15:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T18:20:00.000Z',
              y: 0,
            },
            {
              t: '2018-05-01T18:25:00.000Z',
              y: 0,
            },
          ],
          lineTension: 0,
          fill: false,
          borderColor: color,
          backgroundColor: color,
          pointBackgroundColor: color,
        },
      ],
    };
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
            drawBorder: true,
            color: 'white',
            display: false,
          },
          ticks: { fontColor: 'white' },
        }],
        yAxes: [{
          color: 'white',
          gridLines: {
            drawBorder: true,
            color: 'white',
            display: false,
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
    this.renderChart(data, options);
  },

  beforeDestroy() {
    worker.stop();
  },
};
</script>
