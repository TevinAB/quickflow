import { Response } from 'express';

export type HashFunction = (text: string, rounds: number) => Promise<string>;

export type HashCompare = (
  text: string,
  encryptedText: string
) => Promise<boolean>;

export type Resources =
  | 'contact'
  | 'account'
  | 'deal'
  | 'event'
  | 'task'
  | 'email'
  | 'customization';

export type SendErrorResponse = (
  response: Response,
  errorCode: number,
  error: Error
) => void;
