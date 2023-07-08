const fp = require("fastify-plugin");

async function getAll(client, accountId) {
  const { rows } = await client.query(
    `select boards.id, boards.title
        from boards
        join account_boards
        on boards.id = account_boards.board
        where account_boards.account = $1;`
    , [accountId]);
  return rows;
}

async function create(transact, accountId, title) {
  return transact(async client => {
    const { rows } = await client.query(`insert into boards(title) values($1) returning *;`, [title]);
    const [board] = rows;
    await client.query(`insert into account_boards(account, board) values($1, $2)`, [accountId, board.id]);
    return board;
  });
}

async function boardRepo(fastify, _, done) {
  fastify.decorate("boardRepo", {
    getAll,
    create,
  });

  done();
}

module.exports = fp(boardRepo);
