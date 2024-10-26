import axios from 'axios';
//GET /api/auth
export const getAuth = async (token: string) => {
  return await axios.get('/api/auth', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

//POST /api/verify
export const verifyCode = async (code: string) => {
  return await axios.post('/api/verify', { code });
}
