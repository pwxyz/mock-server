
import * as Router from 'koa-router';
import Project from '../models/Project';

const project = new Router({ prefix: 'project' });

project.post('/', async ctx => {
  const obj = ctx.request.body;
  const data = await Project.create(obj);
  console.log(data);
  ctx.body = {
    code: 201,
    message: '新增项目成功',
    data
  };
});

export default project;