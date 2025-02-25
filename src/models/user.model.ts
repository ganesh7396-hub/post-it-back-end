import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  fullName: string;
  age: number;
  gender: string;
  mail: string;
  phone: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    userName: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    mail: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
