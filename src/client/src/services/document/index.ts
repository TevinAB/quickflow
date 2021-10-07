import { DocumentType } from '../../types';
import { defaultToken } from '../../utils/localStorage';
import { get, post, put, _delete } from '../requests';

export async function getDocumentOne(
  docType: DocumentType,
  id: string,
  token?: string
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
  docType: DocumentType,
  pageNum: number,
  itemsPerPage = 15,
  token?: string
) {
  const _token = defaultToken(token);
  const result = await get(
    `/api/resource/document/${docType.toLowerCase()}s?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`,
    { 'x-auth-token': _token }
  );

  return result;
}

export async function createDocument(
  docType: DocumentType,
  data: {},
  token?: string
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
  docType: DocumentType,
  id: string,
  data: {},
  token?: string
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
  docType: DocumentType,
  id: string | Array<string>,
  token?: string
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
