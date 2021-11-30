import { Response } from 'express';
import type { CreatableObject, FormData, FormField } from 'src/types';

export type HashFunction = (text: string, rounds: number) => Promise<string>;

/**Sanitizes the indvidual property values in an object. Mutates the object. */
export type SanitizeProperties = (dataObject: Record<string, any>) => void;

/**Normalizes an object by removing all properties that are not included in the whitelist. */
export type NormalizeObject<ResultType extends Record<string, any>> = (
  dataObject: Record<string, any>,
  whitelist: Array<string>
) => ResultType;

/**Validates data object using form data. Throws error if validation failed. */
export type BasicFormValidation = (
  dataObject: Record<string, any>,
  formData: FormData
) => void;

/**Get the names of all form fields */
export type GetFormFieldNames = (fieldData: Array<FormField>) => Array<string>;

export type GetNonFormFieldKeys = (
  objectType: CreatableObject
) => Array<string>;

export type HashCompare = (
  text: string,
  encryptedText: string
) => Promise<boolean>;

/**Standard Arguments for most Models. */
type ModelArgs = {
  sanitizeProperties: SanitizeProperties;

  normalizeObject: NormalizeObject<Contact>;

  getFormFieldNames: GetFormFieldNames;

  getNonFormFieldKeys: GetNonFormFieldKeys;

  basicFormValidation: BasicFormValidation;

  formData: FormData;
};

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

export type PicklistData = {
  __type: string;
  text: string;
  value: string;
};
