
// import {isObject, isArray } from 'lodash';
const lodash = require('lodash');
const { isObject, isArray } = lodash;

const swagger = require('./attack.json');



const getApis = (paths, definitions) => {
  let objs = {};
  for (let key in paths) {
    if (isObject(key)) {
      objs[key] = getApis(paths[key], definitions);
    }
    else if (isArray(key)) {
      objs[key] = paths.key.map(i => (isObject(i) ? getApis(paths[key], definitions) : i));
    }
    else if (Object.keys(paths[key]).includes('$ref')) {
      console.log('xxx');
      let newKey = key.replace('#/definitions/', '');
      objs[key] = getApis(definitions[newKey], definitions);
    }
    else { objs[key] = paths[key] }
  }

  return objs;
};

getApis(swagger.paths, swagger.definitions);