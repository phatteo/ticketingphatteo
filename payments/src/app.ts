import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@rallycoding/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);
app.use(createChargeRouter);

// 👇 FIX: ép kiểu cho middleware NotFound
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

// 👇 FIX: ép kiểu tạm cho errorHandler
app.use(errorHandler as any);

export { app };
