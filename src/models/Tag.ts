import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchem = new Schema({
  name: { type: String },
  keys: { type: String },
  created_at: { type: Number, default: Number(new Date()) },
  updated_at: { type: Number, default: Number(new Date()) }
});

const Tag = mongoose.model('Tag', tagSchem);

export default Tag;