import * as dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, NODE_ENV } = process.env;

export {
  JWT_SECRET,
  NODE_ENV,
};
