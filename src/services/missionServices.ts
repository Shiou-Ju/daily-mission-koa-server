import { Query, QueryResult } from 'pg';
import { pool } from '../connections/postgres';
import { Mission } from '../interface/Mission';

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

export const createMissionService = async (
  name: string,
  unit: string,
  amount: number,
  isFixed: boolean,
  increment: number
): Promise<QueryResult> => {
  // TODO:

  const query = `INSERT INTO missions(name, unit, amount, isFixed, increment, createdAt, updatedAt)
  VALUES 
  ('${name}','${unit}',${amount},${isFixed},${increment},now(),now());`;

  console.log(query);
  const row = await pool.query(query);

  return row;
};
