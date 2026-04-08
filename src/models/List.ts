import mongoose, { Schema, Document } from 'mongoose';
import type { ITask } from './Task';

export interface IList extends Document {
  title: string;
  tasks: ITask['_id'][];
}

export const ListSchema: Schema<IList> = new Schema({
  title: String,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

export const ListModel = mongoose.model<IList>('List', ListSchema);
