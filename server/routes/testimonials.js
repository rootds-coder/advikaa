import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Get all testimonials (Public)
router.get('/', async (req, res) => {
  const items = await req.db.collection('testimonials').find({}).toArray();
  res.json(items.map(t => ({ ...t, id: t._id.toString() })));
});

// Add new testimonial (Protected)
router.post('/', verifyToken, async (req, res) => {
  const data = req.body;
  const result = await req.db.collection('testimonials').insertOne({ ...data, createdAt: new Date() });
  res.json({ insertedId: result.insertedId });
});

// Update testimonial (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await req.db.collection('testimonials').updateOne({ _id: new ObjectId(id) }, { $set: updates });
  res.json({ msg: 'updated' });
});

// Delete testimonial (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await req.db.collection('testimonials').deleteOne({ _id: new ObjectId(id) });
  res.json({ msg: 'deleted' });
});

// Optional reset (Protected)
router.post('/reset', verifyToken, async (req, res) => {
  await req.db.collection('testimonials').deleteMany({});
  res.json({ msg: 'reset' });
});

export default router;
