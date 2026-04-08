import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  isComplete: boolean;
}

export const TaskSchema: Schema<ITask> = new Schema({
  title: String,
  isComplete: {
    type: Boolean,
    default: false,
  }
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
