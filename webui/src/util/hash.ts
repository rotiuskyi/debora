export function generateHash(parts = 1) {
  let hash = "";
  for (; parts > 0; parts -= 1) {
    if (hash) {
      hash += "-";
    }
    hash += (Math.random()).toString(16).substring(2).slice(0, 12);
  }
  return hash;
};
