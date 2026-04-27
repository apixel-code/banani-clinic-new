import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';
import AdminUser from '../models/AdminUser.js';

const router = express.Router();

// create admin (one-time)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new AdminUser({ email, password_hash: hash });
    await user.save();
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// login -> returns JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const secret = process.env.JWT_SECRET || 'devsecret';
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: list admins
router.get('/', requireAuth, async (req, res) => {
  const users = await AdminUser.find().select('-password_hash');
  res.json(users);
});

export default router;
