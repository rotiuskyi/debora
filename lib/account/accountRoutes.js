async function accountRoutes(fastify, options) {
  fastify.register(fastify.authorize);

  fastify.get("/auth/account", async (request, reply) => {
    const { userEmail } = request;

    const { rows } = await fastify.pg.query("select * from accounts where accounts.user_email = $1;", [userEmail]);
    const [account] = rows;
    return account;
  });
}

module.exports = accountRoutes;
