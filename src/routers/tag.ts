
import * as Router from 'koa-router';
import Tag from '../models/Tag';

const tag = new Router({ prefix: 'tag' });

tag.post('/', async ctx => {
  const obj = ctx.request.body || {};
  console.log(obj);
  await Tag.create({ ...obj });

  ctx.body = {
    status: 201,
    message: '增加成功'
  };
});

tag.post('/x', async ctx => {
  const obj = ctx.request.body || {};
  console.log(obj);
  // obj['updated_at'] = 0;
  await Tag.findByIdAndUpdate('5c81e6517fc4e4c4a0ceed37', { ...obj });

  ctx.body = {
    status: 201,
    message: '增加成功'
  };
});

export default tag;