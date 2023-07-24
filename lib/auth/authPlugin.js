const fp = require("fastify-plugin");
const createError = require("@fastify/error");
const jose = require("jose");
const JWKS = jose.createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

const Unauthorized = createError("DEBORA_UNATHORIZED", "%s", 401);

async function authPlugin(fastify, opts, done) {
  fastify.decorate("authorize", fp(authorize));
  done();
}

async function authorize(fastify, opts, done) {
  fastify.decorateRequest("accountId", "");

  fastify.addHook("onRequest", async (request, reply) => {
    const { authorization } = request.headers;
    const jwt = authorization.split("Bearer ").pop();

    try {
      const { payload } = await jose.jwtVerify(jwt, JWKS);
      request.accountId = payload.sub;
    } catch (err) {
      throw new Unauthorized(err.message);
    }
  });

  done();
}

module.exports = fp(authPlugin);
