import 'dotenv/config';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';
import * as json from 'koa-json';

const { PORT } = process.env;

const app = new Koa();
const router = new Router();

// controller
router.get('/', async (ctx, next) => {
  ctx.body = { data: 'test' };

  await next();
});

// middleware
app.use(json());
app.use(logger());

// route
app.use(router.routes()).use(router.allowedMethods);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
