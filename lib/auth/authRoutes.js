const jose = require("jose");

async function authRoutes(fastify, options) {
  fastify.get("/auth", async (request, reply) => {
    const code = request.query.code;

    if (!code) {
      return reply.status(400).send({
        message: "Missing \"code\" query parameter."
      });
    }

    const env = process.env;

    const resp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: new URLSearchParams({
        code,
        client_id: env.CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        redirect_uri: "https://localhost/api/auth",
        grant_type: "authorization_code"
      })
    });

    if (!resp.ok) {
      return reply.status(500).send({
        message: "Failed to fetch auth token."
      });
    }

    const { id_token } = await resp.json();
    const payload = jose.decodeJwt(id_token);
    const client = await fastify.pg.connect();

    try {
      const account = await fastify.accountRepo.getAccount(client, payload.sub);
      if (!account) {
        await fastify.accountRepo.createAccount(client, payload);
      }
    } finally {
      client.release();
    }

    reply.redirect(303, `https://localhost/auth?id_token=${id_token}`);
  });
}

module.exports = authRoutes;
