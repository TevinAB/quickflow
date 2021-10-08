import { Cancel_Token } from './../../types/index';
import { DocumentType } from '../../types';
import { buildHeaders } from '../headers';
import { get } from '../requests';

export async function searchDocuments(
  docType: DocumentType,
  query: string,
  cancelToken: Cancel_Token,
  token?: string
) {
  return await get(
    `/api/resource/search/documents/${docType.toLowerCase()}?q=${query}`,
    buildHeaders({ auth: token }),
    { cancelToken }
  );
}

export async function searchProfiles(
  query: string,
  cancelToken: Cancel_Token,
  token?: string
) {
  return await get(
    `/api/resource/search/profiles?q=${query}`,
    buildHeaders({ auth: token }),
    { cancelToken }
  );
}
