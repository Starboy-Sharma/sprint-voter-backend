import { Router } from "express";
import { OK, CREATED } from "http-status-codes";

import { Item } from "../../models/item";
import itemService from "../../services/item";

import { validate, Joi } from "express-validation";

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
  return res.status(OK).json(items);
});

/**
 * @swagger
 * components:
 *  schemas:
 *    NewItem:
 *      required:
 *      - name
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the item
 *          example: "Example Name"
 */
const newItemValidation = {
  body: Joi.object({
    name: Joi.string()
      .min(30)
      .required()
  })
};

/**
 * @swagger
 * '/items':
 *  post:
 *    summary: Create a new item
 *    description: 'Creates a new item and returns it.'
 *    tags:
 *    - items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewItem'
 *    responses:
 *      201:
 *        description: CREATED
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      400:
 *        $ref: '#/components/responses/ValidationError'
 */
router.post("/", validate(newItemValidation), async (req, res) => {
  const { name } = req.body;
  const itemData = { name };
  const item = await itemService.create(itemData);
  return res.status(CREATED).json(item);
});

export default router;
