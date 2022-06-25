import Koa from 'koa';
import Router from 'koa-router';

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

export const getAllMissions = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  // TODO:
  ctx.body = { data: 'all missions' };
  await next();
};
