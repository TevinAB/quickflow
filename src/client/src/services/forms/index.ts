import { FormType } from '../../types';
import { defaultToken } from '../../utils/localStorage';
import { get, put } from '../requests';

export async function getFormData(formType: FormType, token?: string) {
  return await get(
    `/api/resource/customization/form/${formType.toLowerCase()}`,
    {
      'x-auth-token': defaultToken(token),
    }
  );
}

//each list type is from a form type.
export async function getListData(token?: string) {
  return await get('/api/resource/customization/lists', {
    'x-auth-token': defaultToken(token),
  });
}

export async function editFormData(id: string, data: {}, token?: string) {
  return await put(
    `/api/resource/customization/form/${id}`,
    {
      'x-auth-token': defaultToken(token),
      'content-type': 'application/json',
    },
    data
  );
}
