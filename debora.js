const Fastify = require("fastify");
const fastifyEnv = require("@fastify/env");
const pg = require("@fastify/postgres");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");

const {
  NODE_ENV,
  PGPORT,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
} = process.env;
const routePrefix = "/api";

const fastify = Fastify({
  logger: true
});

// Register environment variables, add schemas
fastify.register(fastifyEnv, {
  schema: require("./lib/@schema/EnvSchema.json"),
  dotenv: {
    path: getEnvFilePath(),
    debug: true,
  }
});
fastify.addSchema(require("./lib/@schema/WithAuthorization.json"));
fastify.addSchema(require("./lib/@schema/Account.json"));
fastify.addSchema(require("./lib/@schema/Board.json"));
fastify.addSchema(require("./lib/@schema/Device.json"));

// Register infrastructure plugins
fastify.register(pg, {
  host: "127.0.0.1",
  port: PGPORT,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD
});
fastify.register(swagger);
fastify.register(swaggerUi, {
  routePrefix
});

// Register authorization plugin
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

function getEnvFilePath() {
  const base = `${__dirname}/env/`;
  let suffix = "";

  switch (NODE_ENV) {
    case "prod":
      suffix = ".env.prod";
    case "test":
      suffix = ".env.test";
    case "dev":
    default:
      suffix = ".env.dev";
  }

  return base + suffix;
}
