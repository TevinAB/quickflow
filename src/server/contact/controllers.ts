import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Contact } from './model';

export function getContactWrapper(ContactModel: Model<Contact>) {
  return async function getContact(req: Request, response: Response) {
    const { _id, orgId } = req.params;
    try {
      //orgId used to prevent cross organizational access of resources
      const contact = await ContactModel.findOne({ _id, orgId });
      response.json(contact);
    } catch (error) {
      response.status(404).json({ message: 'Contact not found' });
    }
  };
}

export function createContactWrapper(ContactModel: Model<Contact>) {
  return async function createContact(req: Request, response: Response) {
    const { contactDetails } = req.body;

    try {
      const contact = new ContactModel(contactDetails);

      await contact.save();

      response.status(200).json(contact);
    } catch (error) {
      response.status(400).json({ message: 'Contact not added.' });
    }
  };
}

export function updateContactWrapper(ContactModel: Model<Contact>) {
  return async function updateContact(req: Request, response: Response) {
    const { _id, updateDetails } = req.body;
    try {
      const updatedContact = await ContactModel.updateOne(
        { _id },
        updateDetails
      );

      response.status(200).json(updatedContact);
    } catch (error) {
      response.status(400).json({ message: 'Update failed.' });
    }
  };
}

export function deleteContactWrapper(ContactModel: Model<Contact>) {
  return async function deleteContact(req: Request, response: Response) {
    const { _id } = req.params;

    try {
      await ContactModel.findOneAndDelete({ _id });
      response.status(200).json({ message: 'Contact deleted.' });
    } catch (error) {
      response.status(400).json({ message: 'Failed to delete contact' });
    }
  };
}
