import Koa from 'koa';
import Router from 'koa-router';
import { pool } from '../connections/postgres';
import {
  createMissionService,
  getMissionsService,
  getSingleMissionService,
} from '../services/missionServices';

/** 取得單一任務 */
export const getSingleMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const id = parseInt(ctx.params.id);
    const rows = await getSingleMissionService(id);
    ctx.body = { success: true, data: rows };
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
export const getAllMissions = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const rows = await getMissionsService();
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
export const createMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const { name, unit, amount, isFixed, increment } = ctx.request.body;

  try {
    if (!name || !unit || !amount || !isFixed || !increment) {
      throw new Error('missing field(s)');
    }

    const rows = await createMissionService(
      name,
      unit,
      Number(amount),
      isFixed,
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

export const updateSingleMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO:
  const requestBody = ctx.request.body;
  ctx.body = { data: 'received', requestBody };
  await next();
};

// TODO: delete single mission
export const deleteMissions = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO: create single mission
  const res = await pool.query('SELECT NOW();');
  res;

  ctx.body = { data: 'all missions' };

  await next();
};
