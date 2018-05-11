import objectAssignDeep from 'object-assign-deep';

export default class DatasetArray extends Array {
  pushData(newDataset) {
    const dataset = this.find(d => d.id === newDataset.id);
    if (typeof dataset === 'undefined') {
      return false; // No dataset with matching ID
    }
    dataset.data.push(...newDataset.data);
    return true;
  }

  removeDataDuplicates(maxDatapoints = Infinity) {
    this.forEach((dataset, index) => {
      this[index].data = dataset.data
        .filter((d, i, array) => array.map(a => a.t).lastIndexOf(d.t) === i)
        .slice(maxDatapoints * -1); // Ensure moving window
    });
  }

  // Math methods

  average() {
    return this.sum() / this.reduce((sum, dataset) => (
      sum + dataset.data.length
    ), 0);
  }

  max() {
    const max = Math.max(...this.reduce((merged, dataset) => (
      merged.concat(dataset.data.map(d => d.y))
    ), []));
    return max === -Infinity ? 0 : max;
  }

  sum() {
    return this.reduce((sum, dataset) => (
      sum + dataset.data.reduce((s, d) => s + d.y, 0)
    ), 0);
  }

  // Subset methods

  noZeros() {
    const datasets = new DatasetArray();
    this.forEach((dataset) => {
      const trimmedDataset = objectAssignDeep({}, dataset);
      trimmedDataset.data = trimmedDataset.data.filter(d => d.y > 0);
      datasets.push(trimmedDataset);
    });
    return datasets;
  }

  latest(count = 1) {
    const datasets = new DatasetArray();
    this.forEach((dataset) => {
      const trimmedDataset = objectAssignDeep({}, dataset);
      trimmedDataset.data = trimmedDataset.data.slice(count * -1);
      datasets.push(trimmedDataset);
    });
    return datasets;
  }

  tagged(tag) {
    const datasets = new DatasetArray();
    this.forEach((dataset) => {
      if (dataset.tags.includes(tag)) {
        datasets.push(dataset);
      }
    });
    return datasets;
  }

  ided(id) {
    const datasets = new DatasetArray();
    this.forEach((dataset) => {
      if (dataset.id === id) {
        datasets.push(dataset);
      }
    });
    return datasets;
  }
}
