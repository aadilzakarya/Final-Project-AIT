// app.mjs
import express from 'express';

import { Article } from './db.mjs';

const app = express();
import url from 'url';
import path from 'path';
app.use(express.urlencoded({ extended: false }));


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse form data



app.set('view engine', 'hbs'); // You can use any template engine you prefer
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  try {
    // Retrieve all articles from the database
    const articles = await Article.find().sort({ createdAt: 'desc' });
    console.log(articles);
    res.render('home', { articles });
  } catch (error) {
    console.error('Error handling articles:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/add-blog', (req, res) => {
  res.render('blog-form'); // Assuming you have a view named 'blog-form'
});

// POST route to handle form submission
app.post('/add-blog', async (req, res) => {
  try {
    console.log("TRIAL HERE: ", req.body);
    // Extract data from the form submission
    const { title, content, author } = req.body || {};
    const createdAt = new Date();

    // Create a new Article instance with the form data
    const newArticle = new Article({
      title,
      content,
      author,
      createdAt,
    });

    // Save the new article to the database
    await newArticle.save();

    // Redirect to the home page or wherever you want to go after submission
    res.redirect('/');
  } catch (error) {
    console.error('Error adding a blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen( 8080, () => {
  console.log('Server is running on port 8080');
});
























































// import './config.mjs';

// import express from 'express';
// import session from 'express-session';
// const app = express();

// import './db.mjs';

// import mongoose from 'mongoose';
// const Review = mongoose.model('Review');

// // set up express static

// import url from 'url';
// import path from 'path';
// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, 'public')));

// // configure templating to hbs
// app.set('view engine', 'hbs');

// // body parser (req.body)
// app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: 'your-secret-key', // Change this to a  random secret
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Middleware to track page visits
// app.use((req, res, next) => {
//   req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
//   res.locals.visitCount = req.session.visitCount;
//   console.log("COUNT: ", res.locals.visitCount);
//   app.locals.count = res.locals.visitCount; 
//   next();
// });


// app.use((req, res, next) => {
  
//   if(!req.session.userReview){
//     req.session.userReview = [];
//   }
//   res.locals.userReview = req.session.userReview;
//   next();
// });




// app.get('/', async (req, res) => {
//   try {
//     // Get filtering criteria from query string
//     const { author, title, content  } = req.query;

//     // Build a query object based on form input
//     const query = {};

//     if (semester) {
//       query.author = author;
//     }
//     if (year) {
//       query.title = title;
//     }
//     if (professor) {
//       query.content = content;
//     }

//     // Use Review.find() with the query object to filter reviews or retrieve all reviews
//     const reviews = await Blog.find(query);

//     // Render the reviews in the template
//     res.render('reviews', { reviews });
//   } catch (error) {
//     console.error('Error handling reviews:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // // GET handler for showing the form
// // app.get('/reviews/add', (req, res) => {
// //   res.render('add-review'); // Render the form template
// // });

// // // POST handler for processing form submissions
// // app.post('/reviews/add', async (req, res) => {
// //   try {
// //     // Extract review data from req.body
// //     const { courseNumber, courseName, semester, year, professor, review } = req.body;

// //     // Create a new review document based on the data
// //     const newReview = new Review({
// //       courseNumber,
// //       courseName,
// //       semester,
// //       year,
// //       professor,
// //       review,
// //     });

// //     // Save the new review to the database
// //     await newReview.save();
// //     const userReviews = req.session.userReviews || [];

// //   // Add the new review to the user's reviews
// //   userReviews.push(newReview);

// //   // Update the user's reviews in the session
// //   req.session.userReviews = userReviews;

// //     // Redirect back to the page that displays all reviews
// //     // need to add the review to the list 
// //     res.redirect('/');
// //   } catch (error) {
// //     console.error('Error adding a review:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });


// // app.get('/reviews/mine', (req, res) => {
// //   // Retrieve reviews added by the user during their session
// //   const userReviews = req.session.userReviews || [];
// //   console.log(req.session.userReviews);
// //   //console.log("MEOW: ", userReviews);
  
// //   // Render the reviews added by the user in the template
// //   res.render('my-reviews', { userReviews });
// // });




// app.listen(process.env.PORT || 3000);
