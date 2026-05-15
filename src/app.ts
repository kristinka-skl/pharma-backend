import express from 'express';
// import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import pharmaRouter from './routes/pharmaRouter.js';
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
import { notFoundHandler } from './middlewares/notFoundHandler.js';


const app = express();

app.use(express.json({
      type: ['application/json'],
      limit: '100kb',
    }));
app.use(cors());
app.use(cookieParser());


app.use(authRouter);
app.use(pharmaRouter);


app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

export default app;
