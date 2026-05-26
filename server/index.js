// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import authRoutes from './routes/auth.js';
import galleryRoutes from './routes/gallery.js';
import doctorsRoutes from './routes/doctors.js';
import testimonialsRoutes from './routes/testimonials.js';
import faqsRoutes from './routes/faqs.js';
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(); // DB name comes from MONGODB_URI (/advika)
app.use((req, res, next) => { req.db = db; next(); });

app.use('/api/auth', authRoutes);

// ── Public read routes (no auth needed for homepage) ──
app.use('/api/gallery', galleryRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/faqs', faqsRoutes);

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
