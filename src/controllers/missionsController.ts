import Koa from 'koa';
import Router from 'koa-router';
import { pool } from '../connections/postgres';
import {
  createMission,
  getMissions,
  getMissionById,
  updateMissionByid,
} from '../services/missionServices';

/** 取得單一任務 */
export const getMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const id = parseInt(ctx.params.id);
    const row = await getMissionById(id);
    ctx.body = { success: true, data: row };
    await next();
  } catch (error) {
    // TODO: throw 404 if no row exist
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };
    await next();
  }
};

/** 取得所有任務 */
export const getAllMissionsController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const rows = await getMissions();
    ctx.body = { success: true, data: rows };

    await next();
  } catch (error) {
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };

    await next();
  }
};

/** 建立任務 */
export const createMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const { name, unit, amount, isFixed, increment } = ctx.request.body;

  // TODO: throw error according to different field
  try {
    if (!name || !unit || !amount || !isFixed || !increment) {
      throw new Error('missing field(s)');
    }

    const row = await createMission(
      name,
      unit,
      Number(amount),
      isFixed,
      Number(increment)
    );
    ctx.body = { success: true, data: row };

    await next();
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };

    await next();
  }
};

export const updateMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const { name, unit, amount, isFixed, increment } = ctx.request.body;

  const id = parseInt(ctx.params.id);

  // TODO: throw error according to different field
  try {
    if (!id) {
      throw new Error('Please specify target row id');
    }

    if (!name || !unit || !amount || !isFixed || !increment) {
      throw new Error('missing field(s)');
    }

    // TODO: improve later introducing to variables
    const rows = await updateMissionByid(
      id,
      name,
      unit,
      Number(amount),
      isFixed === 'true',
      Number(increment)
    );
    ctx.body = { success: true, data: rows };

    await next();
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      data: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    };

    await next();
  }
};

// TODO: delete single mission
export const deleteMissionController = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const res = await pool.query('SELECT NOW();');
  res;

  ctx.body = { data: 'all missions' };

  await next();
};
