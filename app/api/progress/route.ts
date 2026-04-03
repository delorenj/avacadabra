import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '../../../lib/db';
import { Client as MinioClient } from 'minio';

function getMinioClient() {
  return new MinioClient({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT, 10) : 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || ''
  });
}

function getBucket() { return process.env.MINIO_BUCKET || 'avamath'; }

async function ensureTable() {
  await getDbPool().query(`
    CREATE TABLE IF NOT EXISTS progress_entries (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      concept TEXT NOT NULL,
      description TEXT NOT NULL,
      explanation TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const { rows } = await getDbPool().query(
      'SELECT id, date, concept, description, explanation, image_url, created_at FROM progress_entries ORDER BY created_at DESC LIMIT 30'
    );
    return NextResponse.json({ entries: rows });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Failed to fetch entries', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const formData = await req.formData();
    const date = formData.get('date') as string;
    const concept = formData.get('concept') as string;
    const description = formData.get('description') as string;
    const explanation = formData.get('explanation') as string;
    const file = formData.get('file') as File | null;

    let imageUrl: string | null = null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const minio = getMinioClient();
      const bkt = getBucket();
      const exists = await minio.bucketExists(bkt).catch(() => false);
      if (!exists) {
        await minio.makeBucket(bkt, 'us-east-1');
      }
      const objectName = `${Date.now()}-${file.name}`;
      await minio.putObject(bkt, objectName, buffer);
      const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
      const port = process.env.MINIO_PORT || '9000';
      imageUrl = `${protocol}://${process.env.MINIO_ENDPOINT}:${port}/${bkt}/${objectName}`;
    }

    await getDbPool().query(
      'INSERT INTO progress_entries (date, concept, description, explanation, image_url) VALUES ($1, $2, $3, $4, $5)',
      [date, concept, description, explanation, imageUrl]
    );
    return new NextResponse('OK', { status: 201 });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Failed to save entry', { status: 500 });
  }
}
