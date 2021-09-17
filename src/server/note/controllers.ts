import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Note } from './model';

export function getNoteWrapper(NoteModel: Model<Note>) {
  return async function getNote(req: Request, response: Response) {
    const { _id, orgId } = req.params;
    try {
      //orgId used to prevent cross organizational access of resources
      const note = await NoteModel.findOne({ _id, orgId });
      response.json(note);
    } catch (error) {
      response.status(404).json({ message: 'Note not found' });
    }
  };
}

export function createNoteWrapper(NoteModel: Model<Note>) {
  return async function createNote(req: Request, response: Response) {
    const { noteDetails } = req.body;

    try {
      const newNote = new NoteModel(noteDetails);

      await newNote.save();

      response.status(200).json(newNote);
    } catch (error) {
      response.status(400).json({ message: 'Note not added.' });
    }
  };
}

export function updateNoteWrapper(NoteModel: Model<Note>) {
  return async function updateNote(req: Request, response: Response) {
    const { _id, updateDetails } = req.body;
    try {
      const updatedNote = await NoteModel.updateOne({ _id }, updateDetails);

      response.status(200).json(updatedNote);
    } catch (error) {
      response.status(400).json({ message: 'Update failed.' });
    }
  };
}

export function deleteNoteWrapper(NoteModel: Model<Note>) {
  return async function deleteNote(req: Request, response: Response) {
    const { _id } = req.params;

    try {
      await NoteModel.findOneAndDelete({ _id });
      response.status(200).json({ message: 'Note deleted.' });
    } catch (error) {
      response.status(400).json({ message: 'Failed to delete note' });
    }
  };
}
