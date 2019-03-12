
import * as Router from 'koa-router';
import Project from '../models/Project';
import Tag from '../models/Tag';

import copy from '../utils/copy';
import getArg from '../utils/getArg';
import getUpdateTime from '../utils/getUpdateTime';
import checkVersion from '../utils/checkVersion';
import { last } from 'lodash';

const project = new Router({ prefix: 'project' });

project.post('/', async ctx => {
  let obj = getArg(ctx.request.body, ['title', 'description', 'version']);
  if (obj['version'] && !checkVersion(obj['version'])) {
    ctx.body = {
      code: 401,
      message: 'version字段不符合格式',
    };
    return;
  }
  const data = await Project.create(obj);
  const datas = await Project.find({ title: obj['title'] });
  if (datas.length >= 2) {
    await Project.findByIdAndRemove(data['_id']);
    ctx.body = {
      code: 401,
      message: 'title字段重复',
    };
  }
  else {
    ctx.body = {
      code: 201,
      message: '新增项目成功',
      data
    };
  }

});
//增加版本
project.post('/version', async ctx => {
  let obj = getArg(ctx.request.body, ['version', 'id']);
  let data = await Project.findById(obj['id']);
  let oldVersion = last(data['version']);
  let canAdd = checkVersion(obj['version'], oldVersion);
  if (canAdd) {
    let objs = { ...obj, version: data['version'].concat(obj['version']), ...getUpdateTime() };
    let datas = await Project.findByIdAndUpdate(obj['id'], objs, { new: true });
    if (datas) {
      //将旧版本的tag复制到新版本去
      let oldVersionTags = await Tag.find({ blongTo: obj['id'], version: oldVersion }).select('-createdAt -updatedAt');
      let newVersionTags = oldVersionTags.map(i => {
        let item = copy(i);
        item['oldVersionId'] = item['_id'];
        item['version'] = obj['version'];
        delete item['_id'];
        return item;
      });
      await Tag.create(...newVersionTags);

      ctx.body = {
        code: 201,
        message: '增加版本号成功'
      };
    }
    else {
      ctx.body = {
        code: 403,
        message: '增加版本号失败1'
      };
    }
  }
  else {
    ctx.body = {
      code: 403,
      message: '增加版本号失败'
    };
  }
});

project.put('/', async ctx => {
  let obj = getArg(ctx.request.body, ['title', 'description', 'id']);
  let id = obj['id'];
  delete obj['id'];
  const data = await Project.findByIdAndUpdate(id, { ...obj, ...getUpdateTime() }, { new: true });
  if (data) {
    ctx.body = {
      code: 201,
      message: '修改成功',
      data
    };
  }
  else {
    ctx.body = {
      code: 402,
      message: '该项目不存在！'
    };
  }
});

export default project;