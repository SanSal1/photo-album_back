import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const SECRET = process.env.SECRET;
export const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const REGION = process.env.AWS_BUCKET_REGION;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
