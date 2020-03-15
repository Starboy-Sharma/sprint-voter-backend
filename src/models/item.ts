import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 * tags:
 * - name: item_model
 *   x-displayName: The Item Model
 *   description: |
 *     <SchemaDefinition schemaRef="#/components/schemas/Item" />
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       title: Item
 *       tags:
 *       - item_model
 *       required:
 *       - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the item
 *           example: "Example item"
 */

export interface Item extends Document {
  name: string;
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
