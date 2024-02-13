import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
let client = null;

const connectToMongodb = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDb is Connected");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClient = () => {
  return client;
};

export const getDb = () => {
  return client.db();
};

const createCounter = async (db) => {
  const collection = db.collection("counters");
  const existingCounter = await collection.findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await collection.insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ desc: "text" });
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongodb;
