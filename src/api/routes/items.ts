import { Router } from "express";
import { OK } from "http-status-codes";

import { Item } from "../../models/item";
import itemService from "../../services/item";

const router = Router();

/**
 * @swagger
 * tags:
 * - name: items
 *   x-displayName: Items
 *   description: 'Everything about Items.'
 */

/**
 * @swagger
 * '/items':
 *  get:
 *    summary: Get all items
 *    description: 'Returns all items.'
 *    tags:
 *    - items
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Item'
 */
router.get("/", async (req, res) => {
  const items: Item[] = await itemService.findAll();
  res
    .status(OK)
    .json(items)
    .end();
});

export default router;
