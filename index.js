const { fastifyInstance: fastify, logger } = require('./logger');
//const fastify = require('fastify')({ logger: true, connectionTimeout: 5000 });
const generateNewWorker = require('./utils/generateNewWorker');
const requestTracker = require('./utils/requestTracker');
const { v4: uuidv4 } = require('uuid');

fastify.addHook('preHandler', (request, reply, done) => {
  //adding correlationId
  if (!request.headers['x-correlation-id']) {
   logger.info('correlationId not found, generating new one');
    const correlationId = uuidv4();
    request.correlationId = correlationId;
  }
 logger.info('x-correlationId:', request.correlationId);
  reply.header('x-correlation-id', request.correlationId);
  done();
});
fastify.get('/getCatsInfo', function handler (request, reply) {
  const getCatsWorker = generateNewWorker('getCatsWorker');
 logger.info(`getCatsInfo request received and new worker for getCatsInfo create workerThreadID: ${getCatsWorker.threadId}`);
  requestTracker[request.id] = (result) => reply.send(result)
  getCatsWorker.postMessage({ requestId: request.id});
})

fastify.get('/getDogsInfo', function handler (request, reply) {
  const getDogsWorker = generateNewWorker('getDogsWorker');
  logger.info(`getCatsInfo request received and new worker for getDogsWorker create workerThreadID: ${getCatsWorker.threadId}`);
  requestTracker[request.id] = (result) => reply.send(result)
  getDogsWorker.postMessage({ requestId: request.id });
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
   logger.error(err);
    process.exit(1);
  }
});
