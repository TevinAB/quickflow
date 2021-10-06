import { getFromLocalStorage } from '../localStorage';
import { _delete } from '../requests';

export async function deleteDocument(
  docType: string,
  id: string | Array<string>,
  token: string | undefined
) {
  const _token = token ?? getFromLocalStorage('token');
  let _id;

  if (Array.isArray(id)) {
    _id = [...id];
  } else {
    _id = Array.of(id);
  }

  const result = await _delete(
    `/api/resource/document/${docType}`,
    { 'x-auth-token': _token },
    { _ids: _id }
  );

  return result;
}
