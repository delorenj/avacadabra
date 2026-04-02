import { Client as MinioClient } from 'minio';

let client: MinioClient | null = null;

export function getMinioClient(): MinioClient {
  if (!client) {
    const {
      MINIO_ENDPOINT,
      MINIO_PORT,
      MINIO_ACCESS_KEY,
      MINIO_SECRET_KEY,
      MINIO_USE_SSL
    } = process.env;
    if (!MINIO_ENDPOINT || !MINIO_ACCESS_KEY || !MINIO_SECRET_KEY) {
      throw new Error('MinIO configuration is missing');
    }
    client = new MinioClient({
      endPoint: MINIO_ENDPOINT,
      port: MINIO_PORT ? parseInt(MINIO_PORT, 10) : 9000,
      useSSL: MINIO_USE_SSL === 'true',
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY
    });
  }
  return client;
}