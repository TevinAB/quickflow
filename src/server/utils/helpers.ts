import type {
  CreatableObject,
  FormField,
  FormFieldTypes,
  PicklistData,
  SearchData,
} from 'src/types';
import RequestException from 'src/server/exceptions/requestException';
import {
  isArray,
  isObject,
  isValidEmail,
  isValidNumber,
  isValidUrl,
  validatePassword,
} from 'src/utils';
import dayjs, { OpUnitType } from 'dayjs';
import { sanitize as clean } from 'sanitizer';

export async function promiseRetry(
  fn: () => Promise<any>,
  limit: number,
  delay: number
) {
  try {
    const result = await fn();

    return result;
  } catch (error) {
    if (limit < 1) return Promise.reject(error);
    await new Promise((resolve) => setTimeout(resolve, delay));

    await promiseRetry(fn, limit - 1, delay);
  }
}

//Chore: move to shared utils folder
export function isValidDate(date: string | number) {
  return !Number.isNaN(new Date(date).getTime());
}

export function dateStartOf(date: string | Date, unit: OpUnitType) {
  return dayjs(date).startOf(unit);
}

export function dateEndOf(date: string | Date, unit: OpUnitType) {
  return dayjs(date).endOf(unit);
}

/**
 * Sanitizes all properties in an object by removing unsafe HTML tags and attributes.
 * Mutates the original data object.
 * @param data - Object to be sanitized
 */
export function sanitizeProperties(dataObject: Record<string, any>) {
  const objectQueue: Array<Record<string, any>> = [dataObject];

  while (objectQueue.length > 0) {
    const currentTask = objectQueue.shift() || {};

    for (let key in currentTask) {
      if (currentTask.hasOwnProperty(key)) {
        let value = currentTask[key];

        if (isObject(value) || isArray(value)) {
          objectQueue.push(value);
        } else {
          //only need to sanitize strings
          if (typeof value === 'string')
            currentTask[key] = clean(value as string);
        }
      }
    }
  }
}

/**
 * Validates data object using form data. Throws error if validation failed.
 * @param dataObject - Data to be validated
 * @param formData - Form data used to create data object.
 */
export function basicFormValidation(
  dataObject: Record<string, any>,
  fields: Array<FormField>
) {
  const fieldsData = [...fields];
  const fieldNames = Object.keys(dataObject);

  for (let fieldName of fieldNames) {
    const field = fieldsData
      .filter((field_) => field_.name === fieldName)
      .pop();

    if (field) {
      singleFieldValidation(
        dataObject[fieldName],
        field.inputType,
        field.inputLabel
      );
    }
  }
}

/**
 * Validates an individual field based on the field type. Throws exception if validation failed.
 * @param fieldValue - The field value.
 * @param fieldType - The field type.
 * @param fieldLabelName - The name of the field.
 */
export function singleFieldValidation(
  fieldValue: unknown,
  fieldType: FormFieldTypes,
  fieldLabelName: string
) {
  switch (fieldType) {
    case 'Email':
      if (!isValidEmail(fieldValue as string))
        throwInvalidFieldException(fieldLabelName, 400);
      break;

    case 'Number':
      if (!isValidNumber(fieldValue as number))
        throwInvalidFieldException(fieldLabelName, 400);
      break;

    case 'Date':
      if (!isValidDate(fieldValue as string))
        throwInvalidFieldException(fieldLabelName, 400);
      break;

    case 'Url':
      if (!isValidUrl(fieldValue as string))
        throwInvalidFieldException(fieldLabelName, 400);
      break;

    case 'Password':
      const result = validatePassword(fieldValue as string);
      if (!result.is_valid)
        throw new RequestException(result.errorMessage, 400);
      break;

    case 'Picklist':
      const picklist = { ...(fieldValue as PicklistData) };
      if (picklist.text === undefined)
        throwInvalidFieldException(fieldLabelName, 400);
      if (picklist.value === undefined)
        throwInvalidFieldException(fieldLabelName, 400);
      if (picklist.__type !== 'Picklist')
        throwInvalidFieldException(fieldLabelName, 400);
      break;

    case 'Search':
      const search = { ...(fieldValue as SearchData) };
      if (search._id === undefined)
        throwInvalidFieldException(fieldLabelName, 400);
      if (search.name === undefined)
        throwInvalidFieldException(fieldLabelName, 400);
      break;

    default:
      return;
  }
}

function throwInvalidFieldException(fieldLabelName: string, errorCode: number) {
  throw new RequestException(`Invalid field: ${fieldLabelName}.`, errorCode);
}

/**
 * Normalizes an object by removing all properties that are not included in the whitelist.
 * @param dataObject - An object.
 * @param whitelist - List of allowed keys/properties.
 * @returns Result object casted to a specified type.
 */
export function normalizeObject<ResultType extends Record<string, any>>(
  dataObject: Record<string, any>,
  whitelist: Array<string>
) {
  const resultObject: Record<string, any> = {};
  const keys = Object.keys(dataObject).filter((key) => whitelist.includes(key));

  for (let key of keys) {
    resultObject[key] = dataObject[key];
  }

  return resultObject as ResultType;
}

export function getFormFieldNames(fieldData: Array<FormField>) {
  return fieldData.map((field) => field.name);
}

/**
 * Used to return keys that can appear in a data object, but wasn't created from a form field.
 * @param objectType
 * @returns An array of keys.
 */
export function getNonFormFieldKeys(objectType: CreatableObject) {
  const baseDocumentProps = ['_id', 'org_id', 'created', 'name'];
  const mainDocumentProps = ['timeline_id'];

  switch (objectType) {
    case 'Account':
    case 'Contact':
    case 'Deal':
      return [...baseDocumentProps, ...mainDocumentProps];

    case 'Event':
    case 'Task':
    case 'Role':
      return [...baseDocumentProps];

    case 'Profile':
      return [...baseDocumentProps, 'is_ceo', 'notifications'];

    case 'Form':
      return [...baseDocumentProps, 'fields_data'];

    case 'Notification':
      return [...baseDocumentProps, 'profile_id', 'read', 'notification_type'];
  }

  return [] as Array<string>;
}
