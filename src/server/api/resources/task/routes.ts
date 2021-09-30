import { Router } from 'express';
// import TaskModel from './model';

const taskRoutes = Router();

taskRoutes.get('/');
taskRoutes.post('/create');
taskRoutes.put('/update');
taskRoutes.delete('/delete');

export default taskRoutes;
