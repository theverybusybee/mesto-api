import express from 'express';
import path from 'path';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})

const client = new MongoClient('mongodb://localhost:27017/mestodb');

async function run() {
  await client.connect();

  console.log('some code')
  const db = client.db('myDatabase');
  console.log(db)
  // console.log(client.collection('cards'))
  // const db = client.db('index-task');
  // const cards = db.collection('cards');

  // cards.createIndex({'assignee.name': 1, 'createdAt': -1});
  // cards.createIndex({'createdAt': -1, 'assignee.name': 1})
  await client.close();
}

run();