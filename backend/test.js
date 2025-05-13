const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'parkingd';
const collectionName = 'data';

(async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const latestDocument = await collection.find().sort({ date: -1 }).limit(1).toArray();
    console.log('Latest Document:', latestDocument);

    await client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();