import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import GalleryImage from '../models/GalleryImage.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await GalleryImage.find().sort({ created_at: -1 });
  res.json(items);
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const doc = new GalleryImage(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const doc = await GalleryImage.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

router.put('/:id', requireAuth, async (req, res) => {
  const doc = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
