import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes';
import { CONFIG } from './config/config';
import { logger } from './utils/logger';
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broken.' });
});

// Start server
app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});