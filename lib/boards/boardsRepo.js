async function getAll(pg) {
  const client = await pg.connect()
  try {
    const { rows } = await client.query(
      "select * from boards", [],
    )
    // Note: avoid doing expensive computation here, this will block releasing the client
    return rows
  } finally {
    // Release the client immediately after query resolves, or upon error
    client.release()
  }
}

module.exports = {
  getAll,
};
