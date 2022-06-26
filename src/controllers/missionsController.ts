import Koa from 'koa';
import Router from 'koa-router';
import { pool } from '../connections/postgres';
import { getMissionsService } from '../services/missionServices';

export const getSingleMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO:
  const id = ctx.params.id;
  ctx.body = { data: 'test', id };
  await next();
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

export const getAllMissions = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO:
  const docs = await getMissionsService();
  ctx.body = { success: true, data: docs };

  await next();
};
