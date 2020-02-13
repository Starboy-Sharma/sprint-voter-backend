import mongoose, { Schema, Document } from "mongoose";

export interface Item extends Document {
  name: number;
}

const ItemSchema: Schema<Item> = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    strict: true,
    timestamps: true
  }
);

export default mongoose.model<Item>("Item", ItemSchema);
