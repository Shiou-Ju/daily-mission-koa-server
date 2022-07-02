import Koa from 'koa';
import Router from 'koa-router';
import { pool } from '../connections/postgres';
import {
  getMissionsService,
  getSingleMissionService,
} from '../services/missionServices';

export const getSingleMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO:
  try {
    const id = parseInt(ctx.params.id);
    const docs = await getSingleMissionService(id);
    ctx.body = { success: true, data: docs };
    await next();
  } catch (error) {
    // TODO: throw 404 if no row exist
    ctx.body = { success: false, data: error };
    await next();
  }
};

export const getAllMissions = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  try {
    const docs = await getMissionsService();
    ctx.body = { success: true, data: docs };

    await next();
  } catch (error) {
    ctx.body = { success: false, data: error };

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

export const createMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO: create single mission
  const res = await pool.query('SELECT NOW();');
  res;

  ctx.body = { data: 'all missions' };

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
