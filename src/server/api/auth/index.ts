import { Router } from 'express';
import signUpRoutes from './signup/routes';
import loginRoutes from './login/routes';
import jwtBuilder from './middleware/jwtBuilder';

const authRoutes = Router();

authRoutes.use('/sign_up', signUpRoutes);
authRoutes.use('/login', loginRoutes);
authRoutes.use(jwtBuilder);

export default authRoutes;
