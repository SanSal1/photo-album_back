import { Response, NextFunction } from 'express';
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomBytes } from 'crypto';
import { BUCKET_NAME } from '../configs/env.conf';
import { create, getById, getAll, destroy } from '../services/file.service';
import s3Client from '../services/s3Client.service';
import { CRequest } from '../types/CRequest';

export async function getFiles(req: CRequest, res: Response, next: NextFunction) {
  try {
    const files = await getAll(req.query, req.user?.id);
    for (const file of files) {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file.storageKey,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      file.dataValues.url = url;
      delete file.dataValues['storageKey'];
    }
    res.status(200).json(files);
  } catch (err) {
    next(err);
  }
}

export async function getFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await getById(req.params.id, req.user?.id);
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: file.storageKey,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    delete file.dataValues['storageKey'];
    res.status(200).json({ url, ...file.dataValues });
  } catch (err) {
    next(err);
  }
}

export async function postFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const fileKey = `${randomBytes(28).toString('hex')}-${req.file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });
    await s3Client.send(command);
    const file = await create(
      { originalName: req.file.originalname, storageKey: fileKey, private: req.body.private },
      req.user?.id
    );
    delete file.dataValues['storageKey'];
    res.status(201).json(file);
  } catch (err) {
    next(err);
  }
}

export async function deleteFile(req: CRequest, res: Response, next: NextFunction) {
  try {
    const file = await getById(req.params.id, req.user?.id);
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: file.storageKey,
    });
    await s3Client.send(command);
    const success = await destroy(req.params.id, req.user?.id);
    res.status(200).json(success);
  } catch (err) {
    next(err);
  }
}
