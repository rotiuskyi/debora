/**
 * @param {FastifyInstance} fastify 
 * @param {Object} options 
 */
async function authRoutes(fastify, options) {
  fastify.get("/auth", async (request, reply) => {
    const { code } = request.params;

    if (!code) {
      return reply.status(400).send({
        message: "Missing \"code\" query parameter."
      });
    }

    fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: new URLSearchParams({
        code,
        client_id: client_id, // env
        client_secret: client_secret, // env
        redirect_uri: "https://localhost/api/auth",
        grant_type: "authorization_code"
      })
    });

    return {};
  });
}

module.exports = authRoutes;
