import express from 'express';
// import expenseRoutes from './routes/expense.routes';

const app = express();

app.use(express.json());
app.use('/api');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});