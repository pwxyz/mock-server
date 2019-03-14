
import * as Koa from 'koa';
import * as Cors from 'koa-cors';
import * as body from 'koa-body';
import * as dotenv from 'dotenv';
import cache from './middleware/cache';

import router from './routers';

dotenv.config();

require('./db');

const app = new Koa();
const port = process.env.PORT || 3364;

app.use(Cors());
app.use(body());
app.use(cache);
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port, () => { console.log(`this app is running on ${port}`) });