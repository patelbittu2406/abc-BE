const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3300;
mongoose.set('debug', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect('mongodb+srv://test01:test01@cluster0.ma9paxw.mongodb.net/mynewdatabase').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// Define a schema for the post
const postSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

// Define a route for creating a new post
app.post('/api/posts', async (req, res) => {
    const { email, password } = req.body;
    // Create a new post object
    const newPost = new Post({ email, password });

    try {
      // Save the post to the database
      await newPost.save();
      res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
      console.error('Failed to save the post', err);
      res.status(500).json({ error: 'Failed to save the post' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

