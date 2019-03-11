
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


const projectSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  version: { type: Array, default: ['v0.0.1'] },
  created_at: { type: Number, default: Number(new Date()) },
  updated_at: {
    type: Number, default: function() {
      return this.created_at;
    }
  }
});

projectSchema.pre('save', async function() {
  console.log('pre', this);
});

projectSchema.post('save', async function() {
  console.log('post', this);
});

const Project = mongoose.model('Project', projectSchema);



export default Project;