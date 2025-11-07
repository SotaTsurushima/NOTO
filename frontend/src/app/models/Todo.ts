import mongoose, { Schema, Document, Model } from 'mongoose';
import { ITodo } from '../types/todo';

export interface ITodoDocument extends Document, ITodo {}

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'タイトルは必須です'],
      trim: true,
    },
    completed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;