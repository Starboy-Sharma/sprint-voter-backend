import Item from "./item";

describe("Item", () => {
  describe("validation", () => {
    test("name is required", done => {
      const item = new Item({ name: null });
      item.validate(err => {
        expect(err).toHaveProperty("errors.name");
        done();
      });
    });
  });
});
