import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

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

async function addArticle(articleData) {
  try {
    const newArticle = new Article(articleData);
    const savedArticle = await newArticle.save();
    console.log(`Article added: ${savedArticle.title}`);
  } catch (error) {
    console.error('Error adding article:', error);
  }
}

const articlesToAdd = [
  {
    title: 'Sample Article 3',
    content: 'This is the content of Sample Article 1.',
    author: 'Author 1',
  },
  {
    title: 'Sample Article 4',
    content: 'This is the content of Sample Article 2.',
    author: 'Author 2',
  },
  // Add more articles as needed
];

for (const articleData of articlesToAdd) {
  addArticle(articleData);
  console.log(articleData);
}
