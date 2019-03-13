
// import { getCache, setCache } from '../utils/cache';
// import getArg from '../utils/getArg';

//暂时不需要使用缓存

const cache = async (ctx, next) => {
  let path = ctx.url;
  if (/mock\/.+\/.+/.test(path)) {
    // let method = ctx.request.method;
    // let version = ctx.request.body['version'];
  }
  await next();

};


export default cache;