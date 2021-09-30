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

export type NotificationType =
  | 'Contact'
  | 'Account'
  | 'Deal'
  | 'Event'
  | 'Task';

//array type is for when document are edited -- each document field will have before and
//after data saved if they were edited.
export type TimelineBody =
  | string
  | Array<{ beforeEdit: string; afterEdit: string }>;
