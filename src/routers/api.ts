
import * as Router from 'koa-router';
import Api from '../models/Api';
import getArg from '../utils/getArg';
import getUpdateTime from '../utils/getUpdateTime';
import addApi from '../actions/addApi';

const api = new Router({ prefix: 'api' });


//在输入数据中，目前暂不考虑校验数据格式，在生成mock数据时，错误的给出标记即可

api.post('/', async ctx => {
  // let obj = getArg(ctx.request.body, ['res', 'path', 'version', 'method', 'tag', 'req', 'blongTo']);
  // if (!obj['version']) {
  //   ctx.body = {
  //     code: 401,
  //     message: 'version为必填项'
  //   };
  //   return;
  // }
  // let duplicateCheck = await Api.find({ blongTo: obj['blongTo'], version: obj['version'], method: obj['method'], path: obj['path'] });
  // if (duplicateCheck.length) {
  //   ctx.body = {
  //     code: 401,
  //     message: '当前api方法、版本、路径重复，请修改后再试',
  //     duplicateCheck
  //   };
  //   return;
  // }
  // else {
  //   let data = await Api.create(obj);
  //   ctx.body = {
  //     code: 201,
  //     message: data ? '增加成功' : '增加失败',
  //     data
  //   };
  // }
  let { err, message, data } = await addApi(ctx.request.body);
  ctx.body = {
    code: err ? 401 : 201,
    message,
    data
  };
});

//暂不考虑支持单独api升级或者修改版本
api.put('/:id', async ctx => {
  let obj = getArg(ctx.request.body, ['res', 'path', 'method', 'tag', 'req', 'blongTo']);
  // let id = obj['id'];
  let id = ctx.params['id'];
  // delete obj['id'];
  let data = await Api.findOneAndUpdate(id, { ...obj, ...getUpdateTime() }, { new: true });
  ctx.body = {
    code: 201,
    message: data ? '修改成功' : '修改失败',
    data
  };
});

api.get('/:projectid/:version', async ctx => {
  let { projectid, version } = ctx.params;
  let data = await Api.find({ blongTo: projectid, version });
  ctx.body = {
    code: data ? 200 : 401,
    message: data ? '成功' : '失败',
    data
  };
});

api.del('/:id', async ctx => {
  // let obj = getArg(ctx.request.body, ['id']);
  let id = ctx.params['id'];
  try {
    await Api.findByIdAndRemove(id);
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