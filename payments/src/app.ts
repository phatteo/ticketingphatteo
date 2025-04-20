import express, { Request, Response } from 'express';
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

// Router xử lý tạo charge
app.use(createChargeRouter);

// Route không tồn tại
app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

// Xử lý lỗi
app.use(errorHandler);

export { app };
