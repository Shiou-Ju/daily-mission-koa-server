import { Query, QueryResult } from 'pg';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { pool } from '../connections/postgres';

type column = {
  name: string;
  type: string;
};

const createTableIfNotExist = async (tableName: string, columns: column[]) => {
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

export const createMissionService = async (
  queryString: Query
): Promise<QueryResult> => {
  const row = await pool.query('');

  return row;
};
