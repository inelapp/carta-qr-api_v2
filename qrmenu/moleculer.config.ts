import "dotenv/config";
import type { BrokerOptions } from "moleculer";
import { Errors } from "moleculer";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const brokerConfig: BrokerOptions = {
  namespace: "cartaqr-api",
  nodeID: null,
  metadata: {},
  logger: {
    type: "Console",
    options: {
      colors: true,
      moduleColors: false,
      formatter: "full",
      objectPrinter: null,
      autoPadding: false,
    },
  },
  logLevel: "debug",
  //   cacher: {
  //     type: "Redis",
  //     options: {
  //       redis: {
  //         host: REDIS_HOST,
  //         port: REDIS_PORT,
  //         password: REDIS_PASSWORD,
  //       },
  //     },
  //   },
  serializer: "JSON",
  requestTimeout: 60 * 1000,
  retryPolicy: {
    enabled: false,
    retries: 5,
    delay: 100,
    maxDelay: 1000,
    factor: 2,
    check: (err: Error) =>
      err && err instanceof Errors.MoleculerRetryableError && !!err.retryable,
  },
  maxCallLevel: 100,
  heartbeatInterval: 10,
  heartbeatTimeout: 30,
  contextParamsCloning: false,
  tracking: {
    enabled: false,
    shutdownTimeout: 5000,
  },
  disableBalancer: false,
  registry: {
    strategy: "RoundRobin",
    preferLocal: true,
  },
  circuitBreaker: {
    enabled: false,
    threshold: 0.5,
    minRequestCount: 20,
    windowTime: 60,
    halfOpenTime: 10 * 1000,
    check: (err: Error) =>
      err && err instanceof Errors.MoleculerError && err.code >= 500,
  },
  bulkhead: {
    enabled: false,
    concurrency: 10,
    maxQueueSize: 100,
  },
  validator: true,
  errorHandler: null || undefined,
  metrics: {
    enabled: false,
    reporter: {
      type: "",
    },
  },
  tracing: {
    enabled: false,
    exporter: {
      type: "",
    },
  },
  replCommands: null,
};

export default brokerConfig;
