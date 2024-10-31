export const CONFIG = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  TOKEN_EXPIRY: '24h',
  VERIFICATION_CODE: '1234' // In production, this should be stored securely
}