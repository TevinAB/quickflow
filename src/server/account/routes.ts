import { Router } from 'express';
import AccountModel from './model';
import {
  getAccountWrapper,
  createAccountWrapper,
  updateAccountWrapper,
  deleteAccountWrapper,
} from './controllers';

const accountRoutes = Router();

accountRoutes.get('/', getAccountWrapper(AccountModel));
accountRoutes.post('/create', createAccountWrapper(AccountModel));
accountRoutes.put('/update', updateAccountWrapper(AccountModel));
accountRoutes.delete('/delete', deleteAccountWrapper(AccountModel));

export default accountRoutes;
