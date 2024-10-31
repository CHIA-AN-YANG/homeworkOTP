import express from 'express';
import serverless from 'serverless-http';
import { app } from '../../express-server/dist/app.js'; // Adjust path to your Express app

// Wrap your Express app
const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  // any pre-processing here
  const result = await serverlessHandler(event, context);
  // any post-processing here
  return result;
};
