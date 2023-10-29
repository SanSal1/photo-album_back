import { S3Client } from '@aws-sdk/client-s3';
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, REGION } from '../configs/env.conf';

const s3Client = new S3Client({
  region: REGION,
  credentials: { accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY },
});

export default s3Client;
