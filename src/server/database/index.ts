import { MongoClient } from 'mongodb';

const databaseUrl = process.env.MONGODB || '';
const dbName = process.env.MONGODB_NAME || 'test';
const mongoClient = new MongoClient(databaseUrl);

export default async function getDatabase() {
  try {
    const client = await mongoClient.connect();
    console.log('Database connected!');

    return client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}
