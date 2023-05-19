const Fastify = require("fastify");
const pg = require("@fastify/postgres");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const accountRoutes = require("./lib/account/accountRoutes");

const fastify = Fastify({
  logger: true
});

// Register plugins
fastify.register(pg, {
  host: "127.0.0.1",
  port: 5434,
  database: "debora_dev_db",
  user: "rotiuskyi.dev@gmail.com",
  password: "welcome"
});
fastify.register(swagger);
fastify.register(swaggerUi, {
  routePrefix: "/api"
});

// Register routes
fastify.register(accountRoutes, {
  prefix: "/api"
});

// Run the server!
fastify.listen({ host: "0.0.0.0", port: 4000 }, handleListen);

function handleListen(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
