async function boardRoutes(fastify, options) {
  fastify.register(fastify.authorize);

  fastify.get("/boards", async (request, reply) => {
    const { accountId } = request;
    const client = await fastify.pg.connect();

    try {
      const rows = await fastify.boardRepo.getAll(client, accountId);
      return rows;
    } finally {
      client.release();
    }
  });

  fastify.post("/boards", async (request, reply) => {
    const { accountId } = request;
    const { transact } = fastify.pg;

    const board = await fastify.boardRepo.create(transact, accountId, "test_title");
    return board;
  })
}

module.exports = boardRoutes;
