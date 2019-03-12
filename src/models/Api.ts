
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//kind 根据此类型生成模拟数据

const apiSchem = new Schema({
  path: { type: String },
  method: { type: String },
  tag: {
    name: { type: String },
    keys: { type: String },
    id: { type: mongoose.Schema.Types.ObjectId }
  },  //tagid
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
});

const Api = mongoose.model('Api', apiSchem);


export default Api;