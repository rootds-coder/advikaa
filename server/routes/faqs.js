import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Get all FAQs — return flat array (frontend groups by catId) (Public)
router.get('/', async (req, res) => {
  try {
    const items = await req.db.collection('faqs').find({}).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add new FAQ (Protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { catId, q, a } = req.body;
    const result = await req.db.collection('faqs').insertOne({ catId, q, a, createdAt: new Date() });
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update FAQ (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { q, a } = req.body;
    await req.db.collection('faqs').updateOne({ _id: new ObjectId(id) }, { $set: { q, a } });
    res.json({ msg: 'updated' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete FAQ (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await req.db.collection('faqs').deleteOne({ _id: new ObjectId(id) });
    res.json({ msg: 'deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Optional reset (Protected)
router.post('/reset', verifyToken, async (req, res) => {
  try {
    await req.db.collection('faqs').deleteMany({});
    res.json({ msg: 'reset' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;

