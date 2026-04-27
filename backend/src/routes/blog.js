import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await BlogPost.find(req.query.published ? { published: true } : {}).sort({ published_at: -1, created_at: -1 });
  res.json(items);
});

// create (admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const doc = new BlogPost(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const doc = await BlogPost.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

// update (admin)
router.put('/:id', requireAuth, async (req, res) => {
  const doc = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

// delete (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
