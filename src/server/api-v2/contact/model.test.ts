import buildContactModel from './model';
import {
  sanitizeProperties,
  filterObjectKeys,
  getFormFieldNames,
  getNonFormFieldKeys,
  basicFormValidation,
  testWithExceptionJest,
} from 'src/server/utils/helpers';
import contact from 'src/server/meta/fieldDisplays/contact';
import publicFields from 'src/server/meta/publicFields';
import type { FormField, Contact } from 'src/types';

describe('contact model tests.', () => {
  const contactFormFields = publicFields.filter((field) =>
    Boolean(
      contact.form.find((contactField) => contactField.name === field.name)
    )
  );
  const contactModel = buildContactModel({
    sanitizeProperties,
    filterObjectKeys,
    getFormFieldNames,
    getNonFormFieldKeys,
    basicFormValidation,
    formFields: contactFormFields as unknown as Array<FormField>,
  });

  it('should fail to create contact if a field has invalid data.', () => {
    const contactData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: 'invalid value',
    } as unknown as Contact;

    expect(
      testWithExceptionJest(contactModel.create.bind(null, contactData))
    ).toBe(false);
  });

  it('should remove invalid properties from contactData when creating contact.', () => {
    const contactData = {
      invalidProp1: 'not valid',
      firstName: 'John',
      harmfulProp: 'some harmful input',
      lastName: 'Doe',
      invalidProp2: 'not valid',
    } as unknown as Contact;

    const contact = contactModel.create(contactData);

    expect(contact).toEqual({ firstName: 'John', lastName: 'Doe' });
  });

  it('should remove harmful characters from property values when creating contact.', () => {
    const harmful = '<script>code..</script>';
    const contactData = {
      firstName: harmful,
      lastName: 'Doe',
      owner: {
        name: harmful,
        _id: '8361sd13ka24ksi1',
      },
    } as unknown as Contact;

    const contact = contactModel.create(contactData);

    expect(contact).toEqual({
      firstName: '',
      lastName: 'Doe',
      owner: {
        name: '',
        _id: '8361sd13ka24ksi1',
      },
    });
  });
});
