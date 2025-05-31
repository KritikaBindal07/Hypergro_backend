import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; 
  email: string;
  password: string;
  favorites: mongoose.Types.ObjectId[];
  recommendationsReceived: {
    property: mongoose.Types.ObjectId;
    recommendedBy: mongoose.Types.ObjectId;
  }[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  recommendationsReceived: [
    {
      property: { type: Schema.Types.ObjectId, ref: 'Property' },
      recommendedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
