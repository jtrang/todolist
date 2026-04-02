import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  isComplete: boolean;
}

export const TaskSchema: Schema<ITask> = new Schema({
  title: String,
  isComplete: Boolean
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
