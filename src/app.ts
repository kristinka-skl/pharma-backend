import express from 'express';
// import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import pharmaRouter from './routes/pharmaRouter.js';
import cookieParser from "cookie-parser";
import { errors } from "celebrate";


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use(authRouter);
app.use(pharmaRouter);
// app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errors());
app.use(errorHandler);

export default app;
