
import * as mockjs from 'mockjs';
import { isUndefined } from 'lodash';

const Random = mockjs.Random;

const mockFn = key => Random[key]();

const otherArr = ['object', 'array'];

const mockRes = (obj: object, arg: object, limit?: number) => {
  let newObj = {};
  for (let key in obj) {
    if (!otherArr.includes(obj[key]['type'])) {
      newObj[key] = translateArg(obj[key], key, arg);
    }
    else if (obj[key]['type'] === 'object') {
      newObj[key] = mockRes(obj[key]['properties'], arg, limit);
    }
    else {
      // newObj[key] = [mockRes(obj[key]['items'], limit)];
      let num = /data/.test(key) && obj[key]['type'] === 'array' ? limit : 1;
      newObj[key] = [...Array(num)].map(i => mockRes(obj[key]['items'], arg, limit));
    }
  }
  return newObj;
};
//随机生成近一年的时间戳，毫秒数
const getTime = () => {
  let random = Random.integer(0, 3600 * 1000 * 24 * 365);
  return Number(new Date()) - random;
};

const translateArg = (obj: object, key: string, arg: object) => {
  if (key === 'status') {
    return 1;
  }
  else if (key === 'total') {
    return Random.integer(40, 100);
  }
  else {
    let kind = obj['kind'] ? obj['kind'] : obj['type'];
    if (kind === 'date') {
      return getTime();
    }
    else {
      let value = isUndefined(arg[key]) ? mockFn(kind) : arg[key] + mockFn(kind);
      return value;
    }
  }
};



export default mockRes;