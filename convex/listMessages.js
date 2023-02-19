import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db.query("listings").collect();
});

export const getById = query(async ({ db }, messageId) => {
  return db.get(messageId);
})