async function boardsRoutes(fastify, options) {
  fastify.get("/boards", async (request, reply) => {
    const { rows } = await fastify.pg.query("select * from boards;");
    return rows;
  });
}

module.exports = boardsRoutes;
