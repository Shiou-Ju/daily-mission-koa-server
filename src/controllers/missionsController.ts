import Koa from 'koa';
import Router from 'koa-router';

export const getSingleMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const a = ctx.params.id;
  ctx.body = { data: 'test', a };
  await next();
};

export const updateSingleMission = async (
  ctx: Router.RouterContext,
  next: Koa.Next
) => {
  const requestBody = ctx.request.body;
  ctx.body = { data: 'received', requestBody };
  await next();
};
