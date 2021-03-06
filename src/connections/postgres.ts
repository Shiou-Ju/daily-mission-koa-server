import * as pg from 'pg';
import {
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} from '../constants/processEnvs';

type DbResponse = {
  result: pg.QueryResult | null;
  // TODO: fix error type
  error: any | null;
};

const config: pg.ConnectionConfig = {
  host: POSTGRES_HOST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  port: parseInt(POSTGRES_PORT),
  // TODO: The server does not support SSL connections
  // ssl: true,
};

const pool = new pg.Pool(config);

const createTablesIfNotExist = async () => {
  const missionTable = `CREATE TABLE IF NOT EXISTS missions (
    id bigserial,
    name varchar(255),
    unit varchar(255),
    amount decimal(10,1),
    is_fixed boolean,
    increment decimal(10,1),
    created_at timestamp,
    updated_at timestamp
);
`;

  const userTable = `CREATE TABLE IF NOT EXISTS users (
  id bigserial,
  name varchar(255),
  password varchar(255),
  streak bigint
);
`;

  const queries = [missionTable, userTable];

  const result = await Promise.all(
    queries.map(async (queryString) => await pool.query(queryString))
  );

  return result;
};

const checkTablesStatus = async () => {
  await createTablesIfNotExist();
  console.log('checkTablesStatus: tables ready');
};

checkTablesStatus();

export { pool, DbResponse };
