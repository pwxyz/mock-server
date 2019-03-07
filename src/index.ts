

import * as Koa from 'koa'
import * as Cors from 'koa-cors';
import * as bodyParser from 'koa-bodyParser';
import * as dotenv from 'dotenv';

import router from './routers';

dotenv.config();

require('./db')

const app = new Koa();
const port = process.env.PORT|| 3364;

app.use(Cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port, () => { console.log(`this app is running on ${port}`)} );