import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import { pagination } from 'typeorm-pagination';
import { load } from 'ts-dotenv/index';
import uploadConfig from 'src/config/upload';
import AppError from '../errors/appError';
import routes from './routes';
import '../typeorm';
import rateLimiter from './middlewares/RateLimiter';

const app = express();
const env = load({
  PORT: String,
  DATABASE_USERNAME: String,
  DATABASE_PASSWORD: String,
  DATABASE_DATABASE: String,
});

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use(routes);
app.use(errors());
app.use('/files', express.static(uploadConfig.directory));
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: error.message,
    });
  },
);
app.listen(env.PORT, () => {
  console.log(`server is running on ${env.PORT}`);
});
