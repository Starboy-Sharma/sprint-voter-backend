import ItemModel, { Item } from "../models/item";

class ItemService {
  async findAll(): Promise<Item[]> {
    return ItemModel.find();
  }
}

export default new ItemService();
