import * as mongoose from 'mongoose';

export const UserAuthSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  profileId: String,
});
