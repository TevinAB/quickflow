import type { FormType } from '../../types';
import { buildHeaders } from '../headers';
import { get, put, buildRequestData } from '../requests';

export async function getFormData(formType: FormType, token: string) {
  return await get(
    `/api/resource/customization/form/${formType.toLowerCase()}`,
    buildHeaders({ auth: token })
  );
}

//each list type is from a form type.
export async function getListData(listType: FormType, token: string) {
  return await get(
    `/api/resource/customization/list/${listType.toLowerCase()}`,
    buildHeaders({ auth: token })
  );
}

export async function editFormData(id: string, data: {}, token: string) {
  return await put(
    `/api/resource/customization/form/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data })
  );
}
