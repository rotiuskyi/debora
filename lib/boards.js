const fp = require("fastify-plugin");
const boardsRepo = require("./boards/boardsRepo");
const boardsRoutes = require("./boards/boardsRoutes");

async function boards(fastify) {
  fastify.register(fp(boardsRepo));
  fastify.register(boardsRoutes);
}

module.exports = boards;
