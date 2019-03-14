
import * as Router from 'koa-router';
import Api from '../models/Api';
import Cache from '../models/Cache';
import mockRes from '../utils/mockRes';
import { isUndefined } from 'util';
import getArg from '../utils/getArg';
import { getCache, setCache } from '../utils/cache';


const mock = new Router({ prefix: 'mock' });

//检查必须包含的参数(body与header中的参数一起检查)
const checkArg = (arr1: object[], arr2: string[]) => {
  let newArr = arr1.filter(i => i['require'] && !arr2.includes(i['name'])).map(i => i['name']);
  return newArr;
};


const objToArr = (obj: object) => Object.keys(obj).filter(i => !isUndefined(i));

const getKey = (obj) => obj['projectId'] + obj['version'] + obj['path'] + obj['method'];

mock.post('/config', async ctx => {

  const obj = getArg(ctx.request.body, ['projectId', 'version', 'path', 'method', 'exprieIn', 'res']);
  let key = getKey(obj);
  await setCache(key, obj['res'], obj['exprieIn'] = 60);
  ctx.body = {
    status: 1,
    message: '设置成功'
  };
  return;
});

mock.get('/cache', async ctx => {
  let data = await Cache.find().limit(100);
  ctx.body = {
    code: 1,
    message: '获取成功',
    data
  };
});

mock.post('/uploads', async ctx => {
  console.log('xx', JSON.stringify(ctx.request.body), ctx.request['files']);
  ctx.body = {
    code: 200
  };
});

mock.all('/:projectId/:version/:path\*', async ctx => {
  let projectId = ctx.params['projectId'];
  let version = ctx.params['version'];
  let path: string = '/' + ctx.params['path'];
  let method = ctx.method.toLowerCase();
  let headerArg = ctx.header;
  try {
    let apiData = await Api.findOne({ blongTo: projectId, version, method, path });
    let obj = ctx.request.body;
    let xx = await Api.find();
    console.log(apiData, { blongTo: projectId, version, method, path }, xx);
    let limit = obj['limit'] || 1;
    if (apiData) {
      //检查必须的参数
      let arr = [...objToArr(headerArg), ...objToArr(obj)];
      let array = checkArg(apiData['req'], arr);
      if (array.length === 0) {
        let key = getKey({ projectId, version, path, method });
        let haveCache = await getCache(key);
        let res = haveCache ? haveCache : mockRes(apiData['res'], obj, limit);
        ctx.body = res;
        Cache.create({ projectId, version, path, res, method });
      }
      else {
        ctx.body = {
          status: -1,
          message: `缺少必要的参数${array}`
        };
      }
    }
    else {
      ctx.body = {
        status: -1,
        message: '当前api不存在'
      };
    }
  }
  catch (err) {
    ctx.body = {
      status: -1,
      message: '当前api不存在',
      err
    };
    return;
  }
});

export default mock;