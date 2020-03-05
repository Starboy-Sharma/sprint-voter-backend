import { Router } from "express";
import { OK } from "http-status-codes";

import ItemModel, { Item } from "../../models/item";

const router = Router();

/**
 * @swagger
 * /items:
 *  get:
 *    description: Returns all items
 *    responses:
 *      200:
 *        description: OK
 */
router.get("/", async (req, res) => {
  const items: Item[] = await ItemModel.find();
  res
    .status(OK)
    .json(items)
    .end();
});

export default router;
