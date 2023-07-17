async function accountRoutes(fastify) {
  fastify.register(fastify.authorize);

  const accountOpts = {
    schema: {
      headers: { $ref: "WithAuthorization" },
      response: {
        200: { $ref: "Account" }
      }
    }
  };

  fastify.get("/account", accountOpts, async (request, reply) => {
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
