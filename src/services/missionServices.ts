import { Query, QueryResult } from 'pg';
import { pool } from '../connections/postgres';
import { Mission } from '../interface/Mission';

type column = {
  name: string;
  type: string;
};

export const getMissionsService = async () => {
  const result = await pool.query('SELECT * FROM missions;');

  const missions: Mission[] = result.rows;

  return missions;
};

export const getSingleMissionService = async (id: number) => {
  const result = await pool.query(`SELECT * FROM missions WHERE id = ${id};`);

  const missions: Mission[] = result.rows;

  return missions;
};

export const createMissionsService = async (
  queryString: Query
): Promise<QueryResult> => {
  // TODO:
  const row = await pool.query('');

  return row;
};

const createTableIfNotExist = async (tableName: string, columns: column[]) => {
  // TODO: make it work
  const processedColumns = columns.map((column) => {
    return `${column.name} ${column.type}`;
  });
  const content = processedColumns.join(', \n');
  const queryString = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${content}
  );`;

  const res = await pool.query(queryString);

  return res;
};
