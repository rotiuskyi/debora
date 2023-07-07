async function getAll(client, accountId) {
  try {
    const { rows } = await client.query(
      `select *
        from boards
        join account_boards
        on boards.id = account_boards.board
        where account_boards.account = $1;`
      , [accountId]);
    return rows;
  } finally {
    client.release();
  }
}

async function boardsRepo(fastify) {
  fastify.decorate("boardsRepo", {
    getAll,
  });
}

module.exports = boardsRepo;
