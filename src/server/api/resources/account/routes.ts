import { Router } from 'express';
import AccountModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../../../utils/resourceMethods';

const accountRoutes = Router();

accountRoutes.get('/', wrapperGetResource(AccountModel, 'Account not found.'));
accountRoutes.post(
  '/create',
  wrapperCreateResource(AccountModel, 'Account not added.')
);
accountRoutes.put(
  '/update',
  wrapperUpdateResource(AccountModel, 'Account update failed.')
);
accountRoutes.delete(
  '/delete',
  wrapperDeleteResource(
    AccountModel,
    'Account delete failed.',
    'Account deleted.'
  )
);

export default accountRoutes;
