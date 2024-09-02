import { Router } from 'express';
import { UserController } from '../controllers/user.create.controller';
import { userRoutes } from './UserRoutes/user.routes';


// Importe outras rotas conforme necessário
// import expenseRoutes from './expense.routes';
// import reportRoutes from './report.routes';

const router = Router();

// Configure as rotas
router.use('/users', userRoutes);
// Outras rotas
// router.use('/expenses', expenseRoutes);
// router.use('/reports', reportRoutes);

export default router;