import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
import { seedDatabase } from './db/seedDatabase.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { User } from './models/user.js';
import customersRouter from './routes/customersRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';
import ordersRouter from './routes/ordersRouter.js';
import productsRouter from './routes/productsRouter.js';
import suppliersRouter from './routes/suppliersRouter.js';
import userRouter from './routes/userRouter.js';

const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  }),
);
app.use(express.json());
app.use(
  pinoHttp({
    transport:
      process.env.NODE_ENV === 'production'
        ? undefined
        : { target: 'pino-pretty', options: { colorize: true } },
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'E-Pharmacy admin API is running' });
});

app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/suppliers', suppliersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

const usersCount = await User.countDocuments();
if (usersCount === 0) {
  await seedDatabase();
  console.log('Database was empty, seed data added');
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
