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

// const client = new pg.Client(config);

// const queryDatabase = async (querySentence: string) => {
//   const dbResponse = {
//     result: null,
//     error: null,
//   };
//   client.connect(async (err) => {
//     if (err) throw err;

//     try {
//       const result = await client.query(querySentence);
//       console.log('Table created successfully!');

//       dbResponse.result = result;
//     } catch (error) {
//       console.log(error);
//       console.log('Something went wront. Finished execution.');

//       dbResponse.error = error;
//     }
//   });

//   client.end(() => {
//     console.log('Closed client connection');
//   });

//   return dbResponse;
// };

export { pool, DbResponse };
