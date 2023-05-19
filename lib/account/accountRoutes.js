/**
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function accountRoutes(fastify, options) {
  fastify.get("/time", async (request, reply) => {
    const result = await fastify.pg.query("SELECT now();");
    return result.rows;
  });

  fastify.get("/auth/account", async (request, reply) => {
    const { rows } = await fastify.pg.query("select * from accounts;");
    return rows;
  });
}

module.exports = accountRoutes;
