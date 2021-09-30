import { Router } from 'express';
//import EventModel from './model';

const eventRoutes = Router();

eventRoutes.get('/');
eventRoutes.post('/create');
eventRoutes.put('/update');
eventRoutes.delete('/delete');

export default eventRoutes;
