import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes';
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
const port = process.env.PORT || 4000;
app.listen(port, () => { logger.info(`Server is running on port ${port}`); });

module.exports = app;