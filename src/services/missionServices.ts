import { Query, QueryResult } from 'pg';
import { pool } from '../connections/postgres';
import { Mission } from '../interface/Mission';

type column = {
  name: string;
  type: string;
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

export const createMissionService = async (
  queryString: Query
): Promise<QueryResult> => {
  // TODO:
  const row = await pool.query('');

  return row;
};

export const getMissionsService = async () => {
  // TODO: mock date temporarily

  const missions: Mission[] = [
    {
      id: 11,
      name: '伏地挺身',
      unit: '組',
      isFixed: false,
    },
    { id: 12, name: '唸英文', isFixed: true, unit: '小時' },
    { id: 13, name: '仰臥起坐', isFixed: false, unit: '組' },
    { id: 14, name: '開合跳', isFixed: false, unit: '組' },
    { id: 15, name: '左勾拳', isFixed: false, unit: '組' },
    { id: 16, name: '右鉤拳 ', isFixed: false, unit: '組' },
    { id: 17, name: 'BBC news', isFixed: true, unit: '小時' },
    { id: 18, name: '學習 Angular', isFixed: true, unit: '小時' },
  ];

  return missions;
};
