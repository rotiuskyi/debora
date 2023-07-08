const Fastify = require("fastify");
const fastifyEnv = require("@fastify/env");
const pg = require("@fastify/postgres");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");

const env = process.env;
const routePrefix = "/api";

const fastify = Fastify({
  logger: true
});

// Register infrastracture plugins
fastify.register(fastifyEnv, {
  schema: require("./lib/envSchema"),
  dotenv: {
    path: `${__dirname}/env/${getEnvFilename()}`,
    debug: true,
  }
});

fastify.register(pg, {
  host: "127.0.0.1",
  port: env.PGPORT,
  database: env.PGDATABASE,
  user: env.PGUSER,
  password: env.PGPASSWORD
});

fastify.register(swagger);
fastify.register(swaggerUi, {
  routePrefix
});

fastify.register(require("./lib/auth/authPlugin"));

// Register repositories
fastify.register(require("./lib/account/accountRepo"));
fastify.register(require("./lib/board/boardRepo"));

const routeOpts = {
  prefix: routePrefix
};
// Register routes
fastify.register(require("./lib/auth/authRoutes"), routeOpts);
fastify.register(require("./lib/account/accountRoutes"), routeOpts);
fastify.register(require("./lib/board/boardRoutes"), routeOpts);

// Run the server
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
