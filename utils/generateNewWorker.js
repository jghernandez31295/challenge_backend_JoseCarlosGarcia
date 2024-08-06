const { Worker } = require('worker_threads');
const path = require('path');
const requestTracker = require('./requestTracker');
const TIMEOUT = 15 * 60 * 1000;
const {logger} = require('../logger');
const generateNewWorker = (workerName) => {
  const worker = new Worker(path.join(__dirname, '../workers', workerName));
  let inactivityTimeout;
  const resetRequestTimeout = () => {
    if(inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
    inactivityTimeout = setTimeout(() => {
      logger.warn(`terminating worker due to inactivity ${worker.threadId}`);
      worker.terminate();
    }, TIMEOUT);
  }
  worker.on('message', (data) => {
    const { response, requestId } = data;
    requestTracker[requestId](response);
    delete requestTracker[requestId];
    resetRequestTimeout();
  });
  worker.on('error', () => {
    worker.terminate();
  });
  return worker;
}


module.exports = generateNewWorker;
