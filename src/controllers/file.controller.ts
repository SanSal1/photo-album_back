import { Response, NextFunction } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import { join } from 'path';
import { BUCKET_NAME } from '../configs/env.conf';
import { create, getById, getAll } from '../services/file.service';
import s3Client from '../services/s3Client.service';
import { CRequest } from '../types/CRequest';

export async function getFilesData(req: CRequest, res: Response, next: NextFunction) {
  try {
    const filesData = await getAll(req.query, req.user?.id);
    res.status(200).json(filesData);
  } catch (err) {
    next(err);
  }
}

export async function getFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await getById(req.params.id, req.user?.id);
    const root = join(__dirname.split('dist')[0], 'images'); // TODO: Temporarily store images to this folder in development
    res.sendFile(file.name, { root });
  } catch (err) {
    next(err);
  }
}

export async function postFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const fileKey = randomBytes(32).toString('hex');
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });
    await s3Client.send(command);
    const file = await create(
      { originalName: req.file.originalname, s3Key: fileKey, private: req.body.private },
      req.user?.id
    );
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
}
