import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Appointment.find().sort({ created_at: -1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const doc = new Appointment(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const doc = await Appointment.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

router.put('/:id', async (req, res) => {
  const doc = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

router.delete('/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
