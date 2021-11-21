import * as mongoose from 'mongoose';

export const MailSchema = new mongoose.Schema({
  message: String,
  title: String,
  mailType: String,
  mailId: String,
  read: Boolean,
  targetId: String,
});
