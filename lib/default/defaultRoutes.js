/**
 * @param {FastifyInstance} fastify 
 * @param {Object} options 
 */
async function defaultRoutes(fastify, options) {
  fastify.get("/time", async (request, reply) => {
    const result = await fastify.pg.query("SELECT now();");
    return result.rows;
  });
}

module.exports = defaultRoutes;
