import type { Contact } from 'src/types';
import type { ModelArgs } from 'src/server/types';

export default function buildContactModel({
  sanitizeProperties,
  filterObjectKeys,
  getFormFieldNames,
  getNonFormFieldKeys,
  basicFormValidation,
  formFields,
}: ModelArgs) {
  return {
    create(contactData: Contact) {
      const whitelist = [
        ...getFormFieldNames(formFields),
        ...getNonFormFieldKeys('Contact'),
      ];
      const result = filterObjectKeys(contactData, whitelist);

      // Mutates object
      sanitizeProperties(result);

      validateContact(result);

      return result;
    },
  };

  function validateContact(contactData: Contact) {
    basicFormValidation(contactData, formFields);
  }
}
