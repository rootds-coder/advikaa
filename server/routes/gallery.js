import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Get all gallery images (Public)
router.get('/', async (req, res) => {
  const items = await req.db.collection('gallery').find({}).toArray();
  res.json(items.map(g => ({ ...g, id: g._id.toString() })));
});
// Add new gallery image (Protected)
router.post('/', verifyToken, async (req, res) => {
  const data = req.body;
  const result = await req.db.collection('gallery').insertOne({ ...data, createdAt: new Date() });
  res.json({ insertedId: result.insertedId });
});

// Update gallery image (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await req.db.collection('gallery').updateOne({ _id: new ObjectId(id) }, { $set: updates });
  res.json({ msg: 'updated' });
});

// Delete gallery image (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await req.db.collection('gallery').deleteOne({ _id: new ObjectId(id) });
  res.json({ msg: 'deleted' });
});

// Optional reset (Protected)
router.post('/reset', verifyToken, async (req, res) => {
  await req.db.collection('gallery').deleteMany({});
  res.json({ msg: 'reset' });
});

export default router;
