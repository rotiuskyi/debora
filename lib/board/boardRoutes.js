async function boardRoutes(fastify, options) {
  fastify.register(fastify.authorize);

  const baseRoute = "/boards";

  const boardsGetOpts = {
    schema: {
      headers: { $ref: "WithAuthorization" },
      response: {
        200: {
          type: "array",
          items: { $ref: "Board" }
        }
      }
    }
  };

  fastify.get(baseRoute, boardsGetOpts, async (request, reply) => {
    const { accountId } = request;
    const client = await fastify.pg.connect();

    try {
      const rows = await fastify.boardRepo.getAll(client, accountId);
      return rows;
    } finally {
      client.release();
    }
  });

  const boardCreateOpts = {
    schema: {
      headers: { $ref: "WithAuthorization" },
      body: {
        type: "object",
        properties: {
          title: {
            type: "string"
          }
        }
      }
    }
  };

  fastify.post(baseRoute, boardCreateOpts, async (request, reply) => {
    const { accountId } = request;
    const { title } = request.body;
    const { transact } = fastify.pg;

    const board = await fastify.boardRepo.create(transact, accountId, title);
    return board;
  });

  const boardDeleteOpts = {
    schema: {
      headers: { $ref: "WithAuthorization" },
      params: {
        type: "object",
        properties: {
          boardId: {
            type: "string"
          }
        }
      }
    }
  };

  fastify.delete(`${baseRoute}/:boardId`, boardDeleteOpts, async (request, reply) => {
    const { accountId } = request;
    const { boardId } = request.params;
    const { transact } = fastify.pg;

    await fastify.boardRepo.remove(transact, accountId, boardId);
    return { message: "deleted" };
  });
}

module.exports = boardRoutes;
