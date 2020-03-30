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
 *       - _id
 *       - name
 *       properties:
 *         _id:
 *           type: string
 *           example: "5e7092dc4afc45f107df07fa"
 *         name:
 *           type: string
 *           description: Name of the item
 *           example: "Example item"
 *         createdAt:
 *           type: string
 *           description: timestamp
 *           example: "2020-03-30T06:57:51.231Z"
 *         updatedAt:
 *           type: string
 *           description: timestamp
 *           example: "2020-03-30T06:57:51.231Z"
 */
export interface ItemData {
  name: string;
}

export interface Item extends ItemData, Document {}

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
