import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IPost extends Document {
  title: string;
  description: string;
  postedBy: IUser["_id"];
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
