import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import ContactSubmission from '../models/ContactSubmission.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await ContactSubmission.find().sort({ created_at: -1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const doc = new ContactSubmission(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const doc = await ContactSubmission.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});


router.put('/:id', requireAuth, async (req, res) => {
  const doc = await ContactSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await ContactSubmission.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
