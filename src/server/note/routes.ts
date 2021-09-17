import { Router } from 'express';
import NoteModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const noteRoutes = Router();

noteRoutes.get('/', wrapperGetResource(NoteModel, 'Note not found.'));
noteRoutes.post('/create', wrapperCreateResource(NoteModel, 'Note not added.'));
noteRoutes.put(
  '/update',
  wrapperUpdateResource(NoteModel, 'Note update failed.')
);
noteRoutes.delete(
  '/delete',
  wrapperDeleteResource(NoteModel, 'Note delete failed.', 'Note deleted.')
);

export default noteRoutes;
