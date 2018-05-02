import axios from 'axios';

export default class CloudWatchService {
  constructor(metrics) {
    this.metrics = metrics;
    this.updatedAt = null;
    this.data = [];
  }

  async update() {
    const options = {
      url: process.env.API_ENDPOINT,
      method: 'get',
      headers: {
        'X-Api-Key': process.env.API_KEY,
      },
      // data: {
      //
      // },
    };
    try {
      const updatedAt = Date.now();
      const data = await axios.request(options);
      this.updatedAt = updatedAt; // Doesn't reach if request failed
      this.data = data.data;
    } catch (error) { } // eslint-disable-line no-empty
    return this.data;
  }
}
