
import * as Router from 'koa-router';
import Api from '../models/Api';
import mockRes from '../utils/mockRes';
import { isUndefined } from 'util';

const mock = new Router({ prefix: 'mock' });

//检查必须包含的参数(body与header中的参数一起检查)
const checkArg = (arr1: object[], arr2: string[]) => {
  let newArr = arr1.filter(i => i['require'] && !arr2.includes(i['name'])).map(i => i['name']);
  return newArr;
};

const objToArr = (obj: object) => Object.keys(obj).filter(i => !isUndefined(i));

mock.all('/:projectId/:version', async ctx => {
  let projectId = ctx.params['projectId'];
  let version = ctx.params['version'];
  let method = ctx.method.toLowerCase();
  let headerArg = ctx.header;
  let apiData = await Api.findOne({ blongTo: projectId, version, method });
  let obj = ctx.request.body;
  let limit = obj['limit'] || 1;
  if (apiData) {
    //检查必须的参数
    let arr = [...objToArr(headerArg), ...objToArr(obj)];
    let array = checkArg(apiData['req'], arr);
    if (array.length === 0) {
      ctx.body = mockRes(apiData['res'], obj, limit);
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
});

export default mock;