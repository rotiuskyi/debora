const Fastify = require("fastify");
const fastifyEnv = require("@fastify/env");
const pg = require("@fastify/postgres");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const schema = require("./lib/envSchema");
const defaultRoutes = require("./lib/default/defaultRoutes");
const accountRoutes = require("./lib/account/accountRoutes");
const authRoutes = require("./lib/auth/authRoutes");

const env = process.env;

const fastify = Fastify({
  logger: true
});

// Register plugins
fastify.register(fastifyEnv, {
  schema,
  dotenv: {
    path: `${__dirname}/env/${getEnvFilename()}`,
    debug: true,
  }
});
fastify.register(pg, {
  host: "127.0.0.1", // TODO, use docker container
  port: env.PGPORT,
  database: env.PGDATABASE,
  user: env.PGUSER,
  password: env.PGPASSWORD
});
fastify.register(swagger);
fastify.register(swaggerUi, {
  routePrefix: "/api"
});

registerRoutes(fastify, defaultRoutes);
registerRoutes(fastify, accountRoutes);
registerRoutes(fastify, authRoutes);

// Run the server!
fastify.listen({ host: "0.0.0.0", port: "4000" }, handleListen);

function handleListen(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

function getEnvFilename() {
  switch (process.env.NODE_ENV) {
    case "prod":
      return ".env.prod"
    case "test":
      return ".env.test"
    case "dev":
    default:
      return ".env.dev"
  }
}

function registerRoutes(fastify, routes) {
  fastify.register(routes, {
    prefix: "/api"
  });
}
