async function getOne(client, accountId) {
  try {
    const { rows } = await client.query(
      "select * from accounts where accounts.id = $1;",
      [accountId]
    );
    const [account] = rows;
    return account;
  } finally {
    client.release();
  }
}

async function accountRepo(fastify, _, done) {
  fastify.decorate("accountRepo", {
    getOne,
  });

  done();
}

module.exports = accountRepo;
