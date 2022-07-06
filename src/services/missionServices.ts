// node modules
import _ from 'lodash';
// local modules
import { pool } from '../connections/postgres';
import { Mission } from '../interface/Mission';

export const getMissions = async () => {
  const result = await pool.query('SELECT * FROM missions;');

  const missions: Mission[] = result.rows;

  return missions;
};

export const searchMissions = async (term: string) => {
  const result = await pool.query(`
  SELECT *
  FROM   missions
  WHERE  name ~ '${term}';`);

  const missions: Mission[] = result.rows;

  return missions;
};

export const getMissionById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM missions WHERE id = ${id};`);

  const [mission]: Mission[] = result.rows;

  return mission;
};

export const createMission = async (
  name: string,
  unit: string,
  amount: number,
  isFixed: boolean,
  increment: number
): Promise<Mission> => {
  // TODO: abstract query strings to different components, like 'returnId' = 'RETURNING id'
  const query = `INSERT INTO missions(name, unit, amount, is_fixed, increment, created_at, updated_at)
  VALUES 
  ('${name}','${unit}',${amount},${isFixed},${increment},now(),now())
  RETURNING id;`;

  console.log(query);

  const result = await pool.query(query);
  const [{ id }] = result.rows;

  const created = await getMissionById(id);

  return created;
};

export const updateMissionByid = async (
  // TODO: fix uppercase in columns and interfaces
  id: number,
  name: string,
  unit: string,
  amount: number,
  isFixed: boolean,
  increment: number
): Promise<Mission> => {
  const targetRow = await getMissionById(id);

  if (!targetRow) {
    throw new Error('404');
  }

  const omitFields = ['created_at', 'updated_at', 'id'];

  const orignalFields = _.omit(targetRow, omitFields);

  const newFields = {
    name,
    unit,
    amount: amount.toString().includes('.') ? `${amount}` : `${amount}.0`,
    is_fixed: isFixed,
    increment: increment.toString().includes('.')
      ? `${increment}`
      : `${increment}.0`,
  };

  const hasToUpdate = !_.isEqual(newFields, orignalFields);
  if (hasToUpdate) {
    const query = `
    UPDATE missions
    SET name = '${name}', unit = '${unit}', amount = ${amount}, is_fixed = ${isFixed}, increment = ${increment}, updated_at = now()
    WHERE id = ${id};
    `;

    console.log(query);
    await pool.query(query);
    console.log(`id ${id} updated`);

    const updated = await getMissionById(id);

    return updated;
  }

  // TODO: return error code Not modified
  // maybe considering move some lines to controller
  console.log(`id ${id} not modified`);
  return targetRow;
};

export const deleteMissionById = async (id: number) => {
  const targetRow = await getMissionById(id);

  // TODO: status code
  if (!targetRow) {
    throw new Error('404');
  }

  await pool.query(`DELETE FROM missions WHERE id = ${id};`);

  const mission = await getMissionById(id);

  if (!!mission) {
    throw new Error(`Failed deleting id ${id}`);
  }

  console.log(`id ${id} deleted`);
  return mission;
};

// TODO: see if needed
const getModified = async (rowCount: number) => {
  const query = ` SELECT *
  FROM missions
  ORDER BY created_at DESC
  LIMIT ${rowCount}`;

  const result = await pool.query(query);

  const missions: Mission[] = result.rows;

  return missions;
};
