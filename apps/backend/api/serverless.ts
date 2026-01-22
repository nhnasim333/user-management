import app from '../src/app';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  return app(req, res);
};