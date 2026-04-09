import mongoose, { Schema, Document } from 'mongoose';

// Typescript interface
export interface ITask extends Document {
  title: string;
  isComplete: boolean;
}

// Mongoose schema
export const TaskSchema: Schema<ITask> = new Schema({
  title: String,
  isComplete: {
    type: Boolean,
    default: false,
  }
});

// Mongoose model
export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
