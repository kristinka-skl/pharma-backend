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

const corsOptions = {
  origin: 'https://pharma-frontend-dashboard.vercel.app',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.use(express.json({
      type: ['application/json'],
      limit: '100kb',
    }));
app.use(cookieParser());


app.use(authRouter);
app.use(pharmaRouter);


app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

export default app;
