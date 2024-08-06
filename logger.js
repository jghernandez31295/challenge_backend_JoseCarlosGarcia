const fastify = require('fastify')({ logger: true, connectionTimeout: 5000 });

module.exports = {
  fastifyInstance: fastify,
  logger: fastify.log
};
