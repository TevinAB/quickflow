import { CancelToken, CancelTokenSource } from 'axios';

export type Cancel_Token = CancelToken;
export type Cancel_Token_Source = CancelTokenSource;

export type DocumentType = 'Contact' | 'Account' | 'Deal';

export type FormType = DocumentType;

export type ActivityType = 'Task' | 'Event';

export type SearchType = 'Profile' | DocumentType;

export type SearchResultItem = {
  _id: string;
  __type: SearchType;
  name: string;
};

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  org_name: string;
}

export interface ApiError {
  message: string;
}

export interface Notification {
  title: string;
  read: boolean;
  type: string;
  added: string | Date;
}
