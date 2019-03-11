
import * as Router from 'koa-router';
import Tag from '../models/Tag';
import Project from '../models/Project';
import getArg from '../utils/getArg';
import { includes } from 'lodash';

const tag = new Router({ prefix: 'tag' });

tag.post('/', async ctx => {
  const obj = getArg(ctx.request.body, ['blongTo', 'version', 'name', 'keys']);
  let have = await Project.findById(obj['blongTo']);
  console.log(have);
  if (!have || (!!have && !includes(have['version'], obj['version']))) {
    ctx.body = {
      code: 402,
      message: '不存在该项目或该版本'
    };
    return;
  }
  await Tag.create({ ...obj });

  ctx.body = {
    code: 201,
    message: '增加成功'
  };
});

tag.get('/', async ctx => {
  let obj = getArg(ctx.request.body, ['blongTo', 'version']);
  let data = await Tag.find({ ...obj });
  ctx.body = {
    code: 200,
    message: '获取成功',
    data
  };
});

tag.put('/', async ctx => {
  let obj = getArg(ctx.request.body, ['name', 'keys', 'id']);
  let id = obj['id'];
  delete obj['id'];
  let haves =  await Tag.findByIdAndUpdate(id, { ...obj });
  if (haves) {
    ctx.body = {
      code: 201,
      message: '修改成功'
    };
  }
  else {
    ctx.body = {
      code: 401,
      message: '修改失败'
    };
  }
});

tag.del('/', async ctx => {
  let obj = getArg(ctx.request.body, ['id']);
  await Tag.findByIdAndRemove(obj['id']);
  ctx.body = {
    code: 201,
    message: '删除成功'
  };
});

export default tag;