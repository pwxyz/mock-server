
import * as Router from 'koa-router';
import Api from '../models/Api';
import getArg from '../utils/getArg';

const api = new Router({ prefix: 'api' });

const obj = {
  path: 'login',
  method: 'get',
  tag: {
    name: '威胁分析1',
    keys: 'analyse1',
    id: '5c862b3505862e63682749e8'
  },
  version: 'v0.0.1',
  blongTo: '5c862b2705862e63682749e6',
  req: [
    {
      in: 'body',
      name: 'name',
      require: true,
      type: 'string',
      description: '登录名',
      kind: 'name'
    },
    {
      in: 'body',
      name: 'password',
      require: true,
      type: 'string',
      description: '密码',
      kind: null
    }
  ],
  res: {
    code: {
      type: 'string',
      value: 201,
      kind: null,
    },
    message: {
      type: 'string',
      value: '错误信息',
      kind: null,
    },
    payload: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            ids: {
              type: 'string',
              description: 'ids',
              kind: 'ids'
            }
          }
        }
      }
    }
  }
};


api.post('/', async ctx => {
  let obj = getArg(ctx.request.body, ['res', 'path', 'version', 'method', 'tag', 'req', 'blongTo']);

  ctx.body = {
    code: 201,
    message: '增加成功'
  };
});


export default api;