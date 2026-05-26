import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Login endpoint – only for predefined admin (kuldeep)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password required' });
    }
    const admin = await req.db.collection('users').findOne({ email });
    if (!admin) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: admin._id, role: admin.role || 'admin', email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
