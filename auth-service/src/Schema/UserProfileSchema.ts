import * as mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema({
  profileId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  isManager: Boolean,
});
