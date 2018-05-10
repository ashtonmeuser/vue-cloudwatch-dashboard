import axios from 'axios';
import DatasetArray from './DatasetArray';

export default class CloudWatchService {
  constructor({ periodMinutes = 5, backfillMinutes = 120, refreshMinutes = 5 } = {}, metrics) {
    this.metrics = metrics;
    this.periodMinutes = periodMinutes;
    this.backfillMinutes = backfillMinutes;
    this.refreshMinutes = refreshMinutes;
    this.maxDatapoints = Math.ceil(backfillMinutes / periodMinutes);
    this.updatedAt = null;
    this.datasets = new DatasetArray();
    this.start();
    this.tags = {};
  }

  start() {
    this.update();
    this.task = setInterval(this.update.bind(this), this.refreshMinutes * 60000);
  }

  stop() {
    clearInterval(this.task);
  }

  async update() {
    const options = {
      url: process.env.API_ENDPOINT,
      method: 'post',
      headers: {
        'X-Api-Key': process.env.API_KEY,
      },
      data: {
        start: this.metricStartDate(),
        periodMinutes: this.periodMinutes,
        metrics: this.metrics,
      },
    };
    try {
      const response = await axios.request(options);
      this.updatedAt = new Date(); // Doesn't reach if request failed
      this.appendData(response.data);
    } catch (error) { } // eslint-disable-line no-empty
    return this.data;
  }

  metricStartDate() {
    const now = new Date();
    if (this.updatedAt === null) {
      return new Date(now - (this.backfillMinutes * 60000));
    } else if (now - this.updatedAt > this.periodMinutes * 60000) {
      return new Date(now.getTime() - (this.periodMinutes * 60000));
    }
    return this.updatedAt;
  }

  appendData(datasets) {
    datasets.forEach((newDataset) => {
      if (!this.datasets.pushData(newDataset)) {
        // New dataset, add tags and label, push
        this.datasets.push(this.tagAndLabel(newDataset));
      }
    });
    this.datasets.removeDataDuplicates(this.maxDatapoints);
  }

  tagAndLabel(dataset) {
    // Add tags and labels from metrics objects
    const metric = this.metrics.find(m => m.id === dataset.id);
    return typeof metric === 'undefined' ? dataset : Object.assign(dataset, {
      tags: metric.tags,
      label: metric.label,
    });
  }
}
