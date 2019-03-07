

import * as Router from 'koa-router';
import login from './login';
import api from './api';

const router = new Router();


router.use('/', login.routes(), api.routes());


export default router;