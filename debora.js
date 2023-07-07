const Fastify = require("fastify");
const fp = require("fastify-plugin");
const fastifyEnv = require("@fastify/env");
const pg = require("@fastify/postgres");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const schema = require("./lib/envSchema");
const authPlugin = require("./lib/auth/authPlugin");
const authRoutes = require("./lib/auth/authRoutes");

const account = require("./lib/account");
const boards = require("./lib/boards");
// const boardsRoutes = require("./lib/boards/boardsRoutes");

const env = process.env;
const routePrefix = "/api";

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
  routePrefix
});

fastify.register(authPlugin);

const routeOpts = {
  prefix: routePrefix
};

fastify.register(authRoutes, routeOpts);
fastify.register(account, routeOpts);
fastify.register(boards, routeOpts);
// fastify.register(boardsRoutes, routeOpts);

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
