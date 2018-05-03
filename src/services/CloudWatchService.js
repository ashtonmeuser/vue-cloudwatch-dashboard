import axios from 'axios';

const removeDatasetDuplicates = dataset => dataset.filter((data, index, array) => (
  array.map(d => d.t).lastIndexOf(data.t) === index
));

export default class CloudWatchService {
  constructor({ periodMinutes = 5, backfillMinutes = 120 } = {}, metrics) {
    this.metrics = metrics;
    this.periodMinutes = periodMinutes;
    this.backfillMinutes = backfillMinutes;
    this.maxDatapoints = Math.ceil(backfillMinutes / periodMinutes);
    this.updatedAt = null;
    this.data = [];
  }

  async update() {
    const options = {
      url: process.env.API_ENDPOINT,
      method: 'post',
      headers: {
        'X-Api-Key': process.env.API_KEY,
      },
      data: {
        start: this.updatedAt || new Date(Date.now() - (this.backfillMinutes * 60 * 1000)),
        periodMinutes: this.periodMinutes,
        metrics: this.metrics,
      },
    };
    try {
      const data = await axios.request(options);
      this.updatedAt = new Date(); // Doesn't reach if request failed
      this.appendData(data.data);
    } catch (error) { } // eslint-disable-line no-empty
    return this.data;
  }

  appendData(data) {
    data.forEach((newDataset) => {
      const oldIndex = this.data.findIndex(d => d.label === newDataset.label);
      if (oldIndex >= 0) { // Found
        const oldData = this.data[oldIndex].data;
        this.data[oldIndex].data = removeDatasetDuplicates(oldData.concat(newDataset.data))
          .slice(this.maxDatapoints * -1);
      } else { // New dataset
        this.data.push(newDataset);
      }
    });
  }
}
