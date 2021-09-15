import { Router } from 'express';
import {
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} from './controllers';

const accountRoutes = Router();

accountRoutes.get('/', getAccount);
accountRoutes.post('/create', createAccount);
accountRoutes.put('/update', updateAccount);
accountRoutes.delete('/delete', deleteAccount);

export default accountRoutes;
