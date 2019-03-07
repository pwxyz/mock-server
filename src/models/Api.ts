

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//kind 根据此类型生成模拟数据

const apiSchem = new Schema({
  path: { type: String },
  method: { type: String },
  tag: { type: String },  //tagid
  version: { type: String },
  req: [{
    in: { type: String },
    name: { type: String },
    require: { type: Boolean },
    type: { type: String },
    description: { type: String },
    kind: { type: String }
  }],
  res: {
    type: Object
  }
})


export default apiSchem;