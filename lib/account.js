const fp = require("fastify-plugin");
const accountRepo = require("./account/accountRepo");
const accountRoutes = require("./account/accountRoutes");

async function account(fastify) {
  fastify.register(fp(accountRepo));
  fastify.register(accountRoutes);
}

module.exports = account;
