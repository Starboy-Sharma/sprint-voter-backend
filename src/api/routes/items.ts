import { Router } from "express";
import { OK } from "http-status-codes";

import { Item } from "../../models/item";
import itemService from "../../services/item";

const router = Router();

/**
 * @openapi
 * tags:
 *  - name: Items
 *    description: Item routes
 */

/**
 * @openapi
 * /items:
 *  get:
 *    summary: Get all items
 *    description: Returns all items
 *    tags:
 *    - Items
 *    responses:
 *      200:
 *        description: OK
 */
router.get("/", async (req, res) => {
  const items: Item[] = await itemService.findAll();
  res
    .status(OK)
    .json(items)
    .end();
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(id);
});

export default router;
