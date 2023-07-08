const fp = require("fastify-plugin");

async function createAccount(client, {
  sub,
  email,
  name,
  picture,
  iss,
}) {
  const { rows } = await client.query(
    `insert into accounts(id, user_email, user_name, picture, issuer)
      values($1, $2, $3, $4, $5) returning *;`,
    [sub, email, name, picture, iss]
  );
  const [account] = rows;
  return account;
}

async function getAccount(client, accountId) {
  const { rows } = await client.query(
    "select * from accounts where accounts.id = $1;",
    [accountId]
  );
  const [account] = rows;
  return account;
}

async function accountRepo(fastify, _, done) {
  fastify.decorate("accountRepo", {
    createAccount,
    getAccount,
  });

  done();
}

module.exports = fp(accountRepo);
