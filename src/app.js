import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Personal Finance API is running'
  });
});

app.use('/api', routes);
app.use(errorMiddleware);

export default app;
