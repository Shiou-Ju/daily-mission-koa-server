import 'dotenv/config';

// TODO: fix types here, make enum or generics?
export const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;
