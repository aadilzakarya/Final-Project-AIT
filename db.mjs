// db.mjs
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

console.log(process.env.DSN);

mongoose.connect(process.env.DSN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

// Define the Article schema
const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

export { Article };
