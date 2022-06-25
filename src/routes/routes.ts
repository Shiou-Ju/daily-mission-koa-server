import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = { data: 'test' };
  await next();
});

router.post('/', async (ctx, next) => {
  const requestBody = ctx.request.body;
  ctx.body = { data: 'received', requestBody };
  await next();
});

export { router };
