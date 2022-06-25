// node modules
import 'dotenv/config';
import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser = require('koa-bodyparser');
// local modules
import { router } from './routes/routes';

const { PORT } = process.env;

const app = new Koa();

// middleware
app.use(json());
app.use(logger());
app.use(bodyParser());

// route
app.use(router.routes()).use(router.allowedMethods);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
