import type { Contact } from 'src/types';
import type { ModelArgs } from 'src/server/types';

export default function buildContactModel({
  sanitizeProperties,
  normalizeObject,
  getFormFieldNames,
  getNonFormFieldKeys,
  basicFormValidation,
  formData,
}: ModelArgs) {
  return function contactModel() {
    return {
      create(contactData: Contact) {
        const whitelist = [
          ...getFormFieldNames(formData.fields),
          ...getNonFormFieldKeys('Contact'),
        ];
        const result = normalizeObject(contactData, whitelist);

        // Mutates object
        sanitizeProperties(result);

        validateContact(result);

        return result;
      },
    };

    function validateContact(contactData: Contact) {
      basicFormValidation(contactData, formData);
    }
  };
}
