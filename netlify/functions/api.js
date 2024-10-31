import express from 'express';
import serverless from 'serverless-http';
import { app } from '../../express-server/dist/app.js'; // Adjust path to your Express app

// Wrap Express app
const handler = serverless(app);

export const handler = async (event, context) => {
  // add any pre-processing
  const result = await handler(event, context);
  // add any post-processing
  return result;
};
