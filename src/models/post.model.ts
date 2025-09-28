import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  user: mongoose.Schema.Types.ObjectId;
  content: string;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IPost>('Post', PostSchema);
