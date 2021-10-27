import type {
  DealCategory,
  DealRangeTypes,
  DocumentType,
  HttpRequestMetaData,
} from '../../types';
import { toStringArray } from '../../utils/localStorage';
import { buildHeaders } from '../headers';
import { get, post, put, _delete } from '../requests';

export async function getDocumentOne(
  docType: DocumentType,
  id: string,
  token: string
) {
  return await get(
    `/api/resource/document/${docType.toLowerCase()}/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function getDocumentMany(
  docType: DocumentType,
  pageNum: number,
  token: string,
  itemsPerPage = 15
) {
  return await get(
    `/api/resource/document/${docType.toLowerCase()}s?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`,
    buildHeaders({ auth: token })
  );
}

export async function createDocument(
  docType: DocumentType,
  data: {},
  requestMetaData: HttpRequestMetaData,
  token: string
) {
  return await post(
    `/api/resource/document/${docType.toLowerCase()}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    { ...data, meta: { ...requestMetaData } }
  );
}

export async function editDocument(
  docType: DocumentType,
  id: string,
  data: {},
  requestMetaData: HttpRequestMetaData,
  token: string
) {
  return await put(
    `/api/resource/document/${docType.toLowerCase()}/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    { ...data, meta: { ...requestMetaData } }
  );
}

export async function deleteDocument(
  docType: DocumentType,
  id: string | Array<string>,
  token: string
) {
  return await _delete(
    `/api/resource/document/${docType.toLowerCase()}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    { _ids: toStringArray(id) }
  );
}

// Deal specific apis for widgets

export async function getDealsOverRange(
  rangeType: DealRangeTypes,
  dealType: DealCategory,
  value: Date,
  token: string
) {
  return await get(
    `/api/resource/document/deals/range` +
      `?status=${dealType}&range=${rangeType.toLowerCase()}&value=${value.toISOString()}`,
    buildHeaders({ auth: token })
  );
}

export async function getAssociatedDeals(primaryDocId: string, token: string) {
  return await get(
    `/api/resource/document/deals/assc/${primaryDocId}`,
    buildHeaders({ auth: token })
  );
}
