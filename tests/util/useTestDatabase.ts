import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);

async function removeAllCollections(): Promise<void> {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections(): Promise<void> {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

export default function setupTestDatabase(): void {
  // Connect to Mongoose
  beforeAll(async () => {
    const url = process.env.MONGO_URL || "";
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    await mongoose.connect(url, mongooseOptions);
  });

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
}
