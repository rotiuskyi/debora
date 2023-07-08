async function accountRoutes(fastify) {
  fastify.register(fastify.authorize);

  fastify.get("/account", async (request, reply) => {
    const { accountId } = request;
    const client = await fastify.pg.connect();

    try {
      const account = await fastify.accountRepo.getAccount(client, accountId);
      return account;
    } finally {
      client.release();
    }
  });
}

module.exports = accountRoutes;
