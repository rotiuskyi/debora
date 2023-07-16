const fp = require("fastify-plugin");

async function getAll(client, accountId) {
  const { rows } = await client.query(
    `select
      boards.id,
      boards.title,
      case when count(devices) = 0
      then '[]'
      else jsonb_agg(devices)
      end devices
      from boards
      join account_boards
      on boards.id = account_boards.board
      left join devices
      on boards.id = devices.board
      where account_boards.account = $1
      group by boards.id;`
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

async function remove(transact, accountId, boardId) {
  return transact(async client => {
    await client.query(
      `delete from account_boards where account_boards.board = $1 and account_boards.account = $2;`
      , [boardId, accountId]
    );
    await client.query(`delete from boards where boards.id = $1;`, [boardId]);
  });
}

async function boardRepo(fastify, _, done) {
  fastify.decorate("boardRepo", {
    getAll,
    create,
    remove,
  });

  done();
}

module.exports = fp(boardRepo);
