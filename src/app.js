import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import router from './router.js';
import errorMiddleware from './shared/middlewares/error.middleware.js';

const app = express();

app.use(cors());

app.use('/', router);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
