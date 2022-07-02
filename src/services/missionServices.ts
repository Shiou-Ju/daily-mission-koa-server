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
