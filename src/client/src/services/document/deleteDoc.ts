import { getFromLocalStorage } from '../localStorage';
import { get, post, put, _delete } from '../requests';

export async function getDocumentOne(
  docType: string,
  id: string,
  token: string | undefined
) {
  const _token = defaultToken(token);

  const result = await get(
    `/api/resource/document/${docType.toLowerCase()}/${id}`,
    {
      'x-auth-token': _token,
    }
  );

  return result;
}

export async function getDocumentMany(
  docType: string,
  token: string,
  pageNum: number,
  itemsPerPage = 15
) {
  const _token = defaultToken(token);
  const result = await get(
    `/api/resource/document/${docType.toLowerCase()}?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`,
    { 'x-auth-token': _token }
  );

  return result;
}

export async function createDocument(
  docType: string,
  data: {},
  token: string | undefined
) {
  const _token = defaultToken(token);

  const result = await post(
    `/api/resource/document/${docType.toLowerCase()}`,
    {
      'x-auth-token': _token,
      'content-type': 'application/json',
    },
    data
  );

  return result;
}

export async function editDocument(
  docType: string,
  id: string,
  data: {},
  token: string | undefined
) {
  const _token = defaultToken(token);

  const result = await put(
    `/api/resource/document/${docType.toLowerCase()}/${id}`,
    {
      'x-auth-token': _token,
      'content-type': 'application/json',
    },
    data
  );

  return result;
}

export async function deleteDocument(
  docType: string,
  id: string | Array<string>,
  token: string | undefined
) {
  const _token = defaultToken(token);
  let _id;

  if (Array.isArray(id)) {
    _id = [...id];
  } else {
    _id = Array.of(id);
  }

  const result = await _delete(
    `/api/resource/document/${docType.toLowerCase()}`,
    { 'x-auth-token': _token, 'content-type': 'application/json' },
    { _ids: _id }
  );

  return result;
}

function defaultToken(token: string | undefined) {
  return token ?? getFromLocalStorage('token');
}
