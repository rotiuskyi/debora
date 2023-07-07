const fp = require("fastify-plugin");
const jose = require("jose");
const JWKS = jose.createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

async function authPlugin(fastify, opts, done) {
  fastify.decorate("authorize", fp(authorize));
  done();
}

async function authorize(fastify, opts, done) {
  fastify.decorateRequest("accountId", "");

  fastify.addHook("onRequest", async (request, reply) => {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new Error("Missing Authorization header.")
    }

    const jwt = authorization.split("Bearer ").pop();
    const { payload } = await jose.jwtVerify(jwt, JWKS);

    request.accountId = payload.sub;
  });

  done();
}

module.exports = fp(authPlugin);
