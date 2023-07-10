const jose = require("jose");

const schema = {
  query: {
    type: "object",
    required: ["code"],
    properties: {
      code: {
        type: "string"
      }
    }
  }
};

async function authRoutes(fastify) {
  fastify.get("/auth", { schema }, async (request, reply) => {
    const {
      CLIENT_ID,
      CLIENT_SECRET,
    } = process.env;

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: new URLSearchParams({
        code: request.query.code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: "https://localhost/api/auth",
        grant_type: "authorization_code"
      })
    });

    if (!res.ok) {
      return reply.status(500).send({
        message: "Failed to fetch auth token."
      });
    }

    const { id_token } = await res.json();
    const payload = jose.decodeJwt(id_token);
    const client = await fastify.pg.connect();

    await createAccountIfNotCreated(client, fastify.accountRepo, payload);

    reply.redirect(`https://localhost/auth?id_token=${id_token}`);
  });
}

async function createAccountIfNotCreated(client, accountRepo, payload) {
  try {
    const account = await accountRepo.getAccount(client, payload.sub);
    if (!account) {
      await accountRepo.createAccount(client, payload);
    }
  } finally {
    client.release();
  }
}

module.exports = authRoutes;
