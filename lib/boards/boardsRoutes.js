async function boardsRoutes(fastify, options) {
  fastify.get("/boards", async (request, reply) => {
    const { accountId } = request;
    const client = await fastify.pg.connect();

    const rows = await fastify.boardsRepo.getAll(client, accountId);
    return rows;
  });
}

module.exports = boardsRoutes;
