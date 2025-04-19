import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@rallycoding/common';
import { ErrorRequestHandler } from 'express';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, // ⛔ Bạn có thể bật thành true nếu dùng HTTPS production
  })
);

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Route không khớp nào sẽ throw NotFoundError
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Middleware xử lý lỗi – ép kiểu an toàn
const safeErrorHandler: ErrorRequestHandler = errorHandler;
app.use(safeErrorHandler);

export { app };
