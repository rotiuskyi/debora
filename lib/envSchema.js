const schema = {
  type: "object",
  required: ["NODE_ENV", "PGHOST", "PGPORT"],
  properties: {
    NODE_ENV: {
      type: "string"
    },
    PGHOST: {
      type: "string",
    },
    PGPORT: {
      type: "string",
      default: "5434"
    }
  }
};

module.exports = schema;