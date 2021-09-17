import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Account } from './model';

export function getAccountWrapper(AccountModel: Model<Account>) {
  return async function getAccount(req: Request, response: Response) {
    const { _id, orgId } = req.params;
    try {
      //orgId used to prevent cross organizational access of resources
      const account = await AccountModel.findOne({ _id, orgId });
      response.json(account);
    } catch (error) {
      response.status(404).json({ message: 'Account not found' });
    }
  };
}

export function createAccountWrapper(AccountModel: Model<Account>) {
  return async function createAccount(req: Request, response: Response) {
    const { accountDetails } = req.body;

    try {
      const newAccount = new AccountModel(accountDetails);

      await newAccount.save();

      response.status(200).json(newAccount);
    } catch (error) {
      response.status(400).json({ message: 'Account not added.' });
    }
  };
}

export function updateAccountWrapper(AccountModel: Model<Account>) {
  return async function updateAccount(req: Request, response: Response) {
    const { _id, updateDetails } = req.body;
    try {
      const updatedAccount = await AccountModel.updateOne(
        { _id },
        updateDetails
      );

      response.status(200).json(updatedAccount);
    } catch (error) {
      response.status(400).json({ message: 'Update failed.' });
    }
  };
}

export function deleteAccountWrapper(AccountModel: Model<Account>) {
  return async function deleteAccount(req: Request, response: Response) {
    const { _id } = req.params;

    try {
      await AccountModel.findOneAndDelete({ _id });
      response.status(200).json({ message: 'Account deleted.' });
    } catch (error) {
      response.status(400).json({ message: 'Failed to delete account' });
    }
  };
}
