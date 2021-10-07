import { DocumentType } from '../../types';
import { defaultToken, toStringArray } from '../../utils/localStorage';
import { get, post, put, _delete } from '../requests';
import { AUTH_HEADER } from './../../constants/index';

export async function getDocumentOne(
  docType: DocumentType,
  id: string,
  token?: string
) {
  return await get(`/api/resource/document/${docType.toLowerCase()}/${id}`, {
    [AUTH_HEADER]: defaultToken(token),
  });
}

export async function getDocumentMany(
  docType: DocumentType,
  pageNum: number,
  itemsPerPage = 15,
  token?: string
) {
  return await get(
    `/api/resource/document/${docType.toLowerCase()}s?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`,
    { [AUTH_HEADER]: defaultToken(token) }
  );
}

export async function createDocument(
  docType: DocumentType,
  data: {},
  token?: string
) {
  return await post(
    `/api/resource/document/${docType.toLowerCase()}`,
    {
      [AUTH_HEADER]: defaultToken(token),
      'content-type': 'application/json',
    },
    data
  );
}

export async function editDocument(
  docType: DocumentType,
  id: string,
  data: {},
  token?: string
) {
  return await put(
    `/api/resource/document/${docType.toLowerCase()}/${id}`,
    {
      [AUTH_HEADER]: defaultToken(token),
      'content-type': 'application/json',
    },
    data
  );
}

export async function deleteDocument(
  docType: DocumentType,
  id: string | Array<string>,
  token?: string
) {
  return await _delete(
    `/api/resource/document/${docType.toLowerCase()}`,
    { [AUTH_HEADER]: defaultToken(token), 'content-type': 'application/json' },
    { _ids: toStringArray(id) }
  );
}
