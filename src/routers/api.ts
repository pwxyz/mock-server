
import * as Router from 'koa-router';
import Api from '../models/Api';
import getArg from '../utils/getArg';

const api = new Router({ prefix: 'api' });


//在输入数据中，目前暂不考虑校验数据格式，在生成mock数据时，错误的给出标记即可

api.post('/', async ctx => {
  let obj = getArg(ctx.request.body, ['res', 'path', 'version', 'method', 'tag', 'req', 'blongTo']);
  if (!obj['version']) {
    ctx.body = {
      code: 401,
      message: 'version为必填项'
    };
    return;
  }
  let duplicateCheck = await Api.find({ blongTo: obj['blongTo'], version: obj['version'], method: obj['method'], path: obj['path'] });
  if (duplicateCheck) {
    ctx.body = {
      code: 401,
      message: '当前api方法、版本、路径重复，请修改后再试'
    };
    return;
  }
  let data = await Api.create(obj);
  ctx.body = {
    code: 201,
    message: data ? '增加成功' : '增加失败',
    data
  };
});

//暂不考虑支持单独api升级或者修改版本
api.put('/', async ctx => {
  let obj = getArg(ctx.request.body, ['res', 'path', 'method', 'tag', 'req', 'blongTo', 'id']);
  let id = obj['id'];
  delete obj['id'];
  let data = await Api.findOneAndUpdate(id, obj, { new: true });
  ctx.body = {
    code: 201,
    message: data ? '修改成功' : '修改失败',
    data
  };
});

api.del('/', async ctx => {
  let obj = getArg(ctx.request.body, ['id']);
  try {
    await Api.findByIdAndRemove(obj['id']);
    ctx.body = {
      code: 201,
      message: '删除成功'
    };
  }
  catch (err) {
    ctx.body = {
      code: 402,
      message: '删除失败',
      err
    };
  }

});

export default api;