import app from "./app.js";

import config from "./config/config.js";

import { connectDb } from "./config/db.js";

const port = config.port || 7000;
console.log(`Port : ${port}`);

const db_url = config.db_url || "mongodb://localhost:27017/typing-test";

connectDb(db_url);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
