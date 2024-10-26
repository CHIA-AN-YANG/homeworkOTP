import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes';
import { CONFIG } from './config/config';
import { logger } from './utils/logger';

const app = express();
// TODO: Add dotenv configuration
// const dotenv = require('dotenv');

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
app.listen(CONFIG.PORT, () => {
  logger.info(`Server is running on port ${CONFIG.PORT}`);
});