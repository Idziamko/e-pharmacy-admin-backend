import 'dotenv/config';
import mongoose from 'mongoose';
import { seedDatabase } from './seedDatabase.js';

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  await seedDatabase();
  console.log('Database seeded successfully');
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error('Seed failed:', error.message);
  await mongoose.disconnect();
  process.exit(1);
});
