import express from 'express';
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

// ✅ NotFoundError handler
app.all('*', async (_req, _res, next) => {
  next(new NotFoundError());
});

// ✅ Global error handler
app.use(errorHandler);

export { app };
