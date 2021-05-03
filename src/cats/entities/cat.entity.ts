import * as mongoose from 'mongoose';

export const Cat = new mongoose.Schema({
  name: String,
  breed: String,
  kind: String,
});