

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({ 
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Number, default: 0 },
  updated_at: { type: Number, default: this.createdAt }
 })


 export default projectSchema;