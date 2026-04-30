import mongoose, { Schema, Document } from 'mongoose';

// Typescript interface
export interface IList extends Document {
  title: string;
  tasks: [Schema.Types.ObjectId];
}

// Mongoose schema
export const ListSchema: Schema<IList> = new Schema({
  title: String,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

// Mongoose model
export const ListModel = mongoose.model<IList>('List', ListSchema);
