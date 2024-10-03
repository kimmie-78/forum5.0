const express = require('express');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const cors = require('cors');
const app = express();
const port = 3100;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Set up SQLite database
const dbPromise = sqlite.open({
  filename: './database.db',
  driver: sqlite3.Database
});

(async () => {
  const db = await dbPromise;

  // Run migrations
  await db.migrate();

  // Get all comments for a post
  app.get('/api/comments/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
      const rows = await db.all('SELECT * FROM comments WHERE post_id = ?', [postId]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve comments' });
    }
  });

  // Add a new comment
  app.post('/api/comments', async (req, res) => {
    const { post_id, comment } = req.body;
    try {
      const result = await db.run('INSERT INTO comments (post_id, comment) VALUES (?, ?)', [post_id, comment]);
      res.status(201).json({ id: result.lastID });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });

  // Delete a comment
  app.delete('/api/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.run('DELETE FROM comments WHERE id = ?', [id]);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  });

// Create a new post
app.post('/api/posts/new', async (req, res) => {
  const { title, name, profession, description, link } = req.body;

  if (!title || !name || !profession || !description || !link) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      const result = await db.run('INSERT INTO posts (title, name, profession, description, link) VALUES (?, ?, ?, ?, ?)', 
      [title, name, profession, description, link]);

      // Return the full post object
      const newPost = await db.get('SELECT * FROM posts WHERE id = ?', [result.lastID]);
      res.status(201).json(newPost);
  } catch (err) {
      res.status(500).json({ error: 'Failed to create post' });
  }
});

// Delete a post
// app.delete('/api/posts/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//       await db.run('DELETE FROM posts WHERE id = ?', [id]);
//       res.status(204).end();
//   } catch (err) {
//       res.status(500).json({ error: 'Failed to delete post' });
//   }
// });


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
