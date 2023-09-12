import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
