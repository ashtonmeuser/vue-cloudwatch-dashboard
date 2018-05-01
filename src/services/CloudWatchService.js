export default class CloudWatchService {
  constructor(metrics) {
    this.data = [];
    this.metrics = metrics;
    this.start();
    this.getMetrics();
  }

  start() {
    this.worker = setInterval(this.getMetrics, 5000);
  }

  stop() {
    clearInterval(this.worker);
  }

  async getMetrics() {
    this.updatedAt = Date.now();
  }
}
