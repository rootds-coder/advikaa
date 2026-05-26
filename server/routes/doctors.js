import { Router } from 'express';
import { ObjectId } from 'mongodb';
const router = Router();
// Get all doctors
router.get('/', async (req, res) => {
  const items = await req.db.collection('doctors').find({}).toArray();
  res.json(items.map(d => ({ ...d, id: d._id.toString() })));
});
// Add new doctor
router.post('/', async (req, res) => {
  const data = req.body;
  const result = await req.db.collection('doctors').insertOne({ ...data, createdAt: new Date() });
  res.json({ insertedId: result.insertedId });
});
// Update doctor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await req.db.collection('doctors').updateOne({ _id: new ObjectId(id) }, { $set: updates });
  res.json({ msg: 'updated' });
});
// Delete doctor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await req.db.collection('doctors').deleteOne({ _id: new ObjectId(id) });
  res.json({ msg: 'deleted' });
});
// Optional reset (clear collection)
router.post('/reset', async (req, res) => {
  await req.db.collection('doctors').deleteMany({});
  res.json({ msg: 'reset' });
});
export default router;
