import serverless from 'serverless-http';
import app from '../../express-server/dist/app.js';

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  // any pre-processing here
  const result = await serverlessHandler(event, context);
  // any post-processing here
  return result;
};
