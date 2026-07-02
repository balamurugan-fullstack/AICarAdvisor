import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes';
import carRoutes from './routes/carRoutes';
import recommendRoutes from './routes/recommendRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api', carRoutes);
app.use('/api', recommendRoutes);

export default app;
