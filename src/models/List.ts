import mongoose, { Schema, Document } from 'mongoose';
import { TaskSchema } from './Task';
import type { ITask } from './Task';

export interface IList extends Document {
  title: string;
  tasks: [ITask];
}

export const ListSchema: Schema<IList> = new Schema({
  title: String,
  tasks: {
    type: [TaskSchema],
    default: [],
  },
});

export const ListModel = mongoose.model<IList>('List', ListSchema);
