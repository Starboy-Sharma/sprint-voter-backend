import ItemModel, { Item, ItemData } from "../models/item";

class ItemService {
  async findAll(): Promise<Item[]> {
    return ItemModel.find();
  }

  async create(item: ItemData): Promise<Item> {
    const model = new ItemModel(item);
    return ItemModel.create(model);
  }
}

export default new ItemService();
