import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  db_url: process.env.MONGO_URI,
  phase: process.env.PHASE,
  secret: process.env.JWT_SECRET,
  salt: process.env.BCRYPT_SALT || 15,
};

export default Object.freeze(config);
