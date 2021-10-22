import type { DealCategory, DealRangeTypes, DocumentType } from '../../types';
import { toStringArray } from '../../utils/localStorage';
import { buildHeaders } from '../headers';
import { get, post, put, _delete } from '../requests';

export async function getDocumentOne(
  docType: DocumentType,
  id: string,
  token?: string
) {
  return await get(
    `/api/resource/document/${docType.toLowerCase()}/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function getDocumentMany(
  docType: DocumentType,
  pageNum: number,
  itemsPerPage = 15,
  token?: string
) {
  return await get(
    `/api/resource/document/${docType.toLowerCase()}s?pageNum=${pageNum}&itemsPerPage=${itemsPerPage}`,
    buildHeaders({ auth: token })
  );
}

export async function createDocument(
  docType: DocumentType,
  data: {},
  token?: string
) {
  return await post(
    `/api/resource/document/${docType.toLowerCase()}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
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
    buildHeaders({ auth: token, contentType: 'application/json' }),
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
    buildHeaders({ auth: token, contentType: 'application/json' }),
    { _ids: toStringArray(id) }
  );
}

// Deal specific apis for widgets

export async function getDealsOverRange(
  rangeType: DealRangeTypes,
  dealType: DealCategory,
  value: string,
  token?: string
) {
  /**Uncomment after fixing server */

  // return await get(
  //   `/api/resource/document/deals/range` +
  //     `?dealType=${dealType}&rangeType=${rangeType.toLowerCase()}&value=${value}`,
  //   buildHeaders({ auth: token })
  // );

  //temp
  return await get(
    `/api/resource/document/deals?pageNum=1&itemsPerPage=20`,
    buildHeaders({ auth: token })
  );
}
