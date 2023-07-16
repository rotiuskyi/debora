async function boardRoutes(fastify, options) {
  fastify.register(fastify.authorize);

  const baseRoute = "/boards";

  fastify.get(baseRoute, async (request, reply) => {
    const { accountId } = request;
    const client = await fastify.pg.connect();

    try {
      const rows = await fastify.boardRepo.getAll(client, accountId);
      return rows;
    } finally {
      client.release();
    }
  });

  fastify.post(baseRoute, async (request, reply) => {
    const { accountId } = request;
    const { transact } = fastify.pg;

    const board = await fastify.boardRepo.create(transact, accountId, "test_title");
    return board;
  });

  fastify.delete(`${baseRoute}/:boardId`, async (request, reply) => {
    const { accountId } = request;
    const { boardId } = request.params;
    const { transact } = fastify.pg;

    await fastify.boardRepo.remove(transact, accountId, boardId);
    return { message: "deleted" };
  });
}

module.exports = boardRoutes;
