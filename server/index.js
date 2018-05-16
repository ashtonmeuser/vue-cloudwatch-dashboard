const AWS = require('aws-sdk'); // eslint-disable-line import/no-unresolved
const d3Scale = require('d3-scale');
const d3Time = require('d3-time');

const formatZeroData = date => ({ t: date, y: 0 });

const linearZeroSeries = (start, end, periodMinutes) => {
  // Array of linearly displaced timestamps that we will project CloudWatch data onto
  const scale = d3Scale.scaleTime().domain([start, end]);
  const ticks = scale.ticks(d3Time.timeMinute.every(periodMinutes));
  const zeros = ticks.map(formatZeroData);

  return zeros;
};

const matchTimestampOrZero = (target, timestamps, values) => {
  // Lookup value at index of target in timestamps or return zero
  const targetTimestamp = target.getTime();
  const index = timestamps.findIndex(timestamp => timestamp.getTime() === targetTimestamp);
  return index < 0 ? 0 : values[index];
};

const minimumDateRange = (startString, periodMinutes) => {
  // CloudWatch can take up to 10 minutes to display metrics, set date range accordingly
  // Adjust end date by half period to ensure most recent data is fetched
  const halfPeriod = (periodMinutes * 60000) / 2;
  const end = new Date(Date.now() + halfPeriod);
  let start = new Date(startString);
  if (end - start < 10 * 60000) {
    start = new Date(end.getTime() - (10 * 60000));
  }
  return { start, end };
};

const getMetrics = async (cloudWatch, dateRange, requestMetrics, periodMinutes) => {
  const zeros = linearZeroSeries(dateRange.start, dateRange.end, periodMinutes);
  const params = {
    StartTime: zeros[0].t,
    MaxDatapoints: 100800, // Maximum 100800
    EndTime: zeros[zeros.length - 1].t,
    MetricDataQueries: requestMetrics.map(metric => ({
      Id: metric.id,
      MetricStat: {
        Metric: {
          Dimensions: [
            {
              Name: metric.dimensionName,
              Value: metric.dimensionValue,
            },
          ],
          MetricName: metric.name,
          Namespace: metric.namespace,
        },
        Period: periodMinutes * 60,
        Stat: metric.stat || 'Sum',
      },
      ReturnData: true,
    })),
    ScanBy: 'TimestampAscending',
  };
  const data = await cloudWatch.getMetricData(params).promise();
  const formatted = data.MetricDataResults.map(metric => ({
    id: metric.Id,
    data: zeros.map(zero => ({
      t: zero.t,
      y: matchTimestampOrZero(zero.t, metric.Timestamps, metric.Values),
    })),
  }));

  return formatted;
};

const handler = async (event, context, callback) => {
  const cloudWatch = new AWS.CloudWatch();
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const data = JSON.parse(event.body);
    const metrics = await getMetrics(
      cloudWatch,
      minimumDateRange(data.start, data.periodMinutes),
      data.metrics,
      data.periodMinutes,
    );
    return callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify(metrics),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error }),
    });
  }
};

module.exports = {
  handler,
};
