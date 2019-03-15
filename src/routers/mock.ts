
import * as Router from 'koa-router';
import Api from '../models/Api';
import Cache from '../models/Cache';
import mockRes from '../utils/mockRes';
import { isUndefined } from 'util';
import getArg from '../utils/getArg';
import { getCache, setCache } from '../utils/cache';
import uploadFile from '../utils/uploadFile';
import * as path from 'path';

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
  // console.log('xx', JSON.stringify(ctx.request.body), JSON.stringify(ctx.request));
  // let pathName = path.join(__dirname, 'uploads');
  // let result = await uploadFile(ctx, { pathName });
  const fields = ctx.request.body.fields; // this will be undefined for file uploads
  const files = ctx.request.files;
  console.log('files', JSON.stringify(files, null, 2));
  ctx.body = {
    code: 200,
    fields: fields,
    files: files,
    data: JSON.stringify(ctx.request.body)
  };
});

mock.get('/test', async ctx => {
  let html = `<form  enctype="multipart/form-data" id='form' >
  <input type="file" id='file' />
  <button type="submit" id='submit' >提交</button>
</form>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
let submit = document.getElementById('submit')
submit.onclick = e => {
  e.preventDefault();
  let input = document.getElementById('file');
  let file = input.files[0]
  let data = new FormData();
  data.append('file',file )
  axios({ method: 'post', url: '/mock/uploads', data }).then(res =>console.log(res.data))
}
</script>`;
  ctx.body = html;


//   ctx.body = `
// <!doctype html>
// <html>
//   <body>
//     <form action="/mock/uploads" enctype="multipart/form-data" method="post">
//     <input type="text" name="username" placeholder="username"><br>
//     <input type="text" name="title" placeholder="title of file"><br>
//     <input type="file" name="uploads" multiple="multiple"><br>
//     <button type="submit">Upload</button>
//   </body>
// </html>`;
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