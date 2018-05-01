# vue-cloudwatch-dashboard

> A dashboard to display AWS CloudWatch metrics built with Vue.

This project was inspired by [Vuepoint](https://github.com/ashtonmeuser/vuepoint). Much of the charting functionality has been stripped in favor of a simple means of interacting with CloudWatch metrics data. They may be added later. The project also favors a responsive layout that works on mobile devices.

## Commands

First, clone the repo. Run `npm install` to install dependencies. Run one of the following commands to build.

```bash
# build for production
npm run build

# development mode
npm run dev

# run unit tests
npm test

# serve the bundled dist folder in production mode
npm run serve
```

## Credentials

The app expects there to be a `.env.{NODE_ENV}` file in the following format:

```
API_ENDPOINT={YOUR_API_ENDPOINT}
API_KEY={YOUR_API_KEY}
```

Replace `NODE_ENV` with `development`, `test`, or `production`. These will be loaded when built for the respective environments and used to interact with your API. See the next section for setting up an endpoint using AWS Gateway and Lambda.

## Lambda Function

A lambda function can be used to serve the expected data from CloudWatch. An example will be included in an update to this repo.

## AWS IAM Permissions

The Lambda function must have access to the `cloudwatch:GetMetricData` permission. Create a role in IAM to allow Lambda to access the correct resources.
