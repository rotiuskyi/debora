async function accountRoutes(fastify) {
  fastify.register(fastify.authorize);

  fastify.get("/auth/account", async (request, reply) => {
    const { accountId } = request;
    const client = await fastify.pg.connect();

    const account = await fastify.accountRepo.getOne(client, accountId);
    return account;
  });
}

module.exports = accountRoutes;
