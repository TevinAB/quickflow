import { Router } from 'express';
import NoteModel from './model';
import {
  getNoteWrapper,
  createNoteWrapper,
  updateNoteWrapper,
  deleteNoteWrapper,
} from './controllers';

const noteRoutes = Router();

noteRoutes.get('/', getNoteWrapper(NoteModel));
noteRoutes.post('/create', createNoteWrapper(NoteModel));
noteRoutes.put('/update', updateNoteWrapper(NoteModel));
noteRoutes.delete('/delete', deleteNoteWrapper(NoteModel));

export default noteRoutes;
