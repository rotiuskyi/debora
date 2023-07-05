/**
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function defaultRoutes(fastify, options) {
  fastify.get("/time", {}, async (request, reply) => {
    const result = await fastify.pg.query("SELECT now();");
    return result.rows;
  });
}

module.exports = defaultRoutes;
