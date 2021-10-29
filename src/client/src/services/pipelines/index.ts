import { buildHeaders } from '../headers';
import { get, post, put, _delete, buildRequestData } from '../requests';
import { toStringArray } from '../../utils/localStorage';

export async function getPipelineOne(id: string, token: string) {
  return await get(
    `/api/resource/customization/pipeline/${id}`,
    buildHeaders({ auth: token })
  );
}

export async function getPipelineMany(token: string) {
  return await get(
    `/api/resource/customization/pipelines`,
    buildHeaders({ auth: token })
  );
}

export async function createPipeline(data: {}, token: string) {
  return await post(
    '/api/resource/customization/pipeline',
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data })
  );
}

export async function editPipeline(id: string, data: {}, token: string) {
  return await put(
    `/api/resource/customization/pipeline/${id}`,
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({ data })
  );
}

export async function deletePipeline(
  id: string | Array<string>,
  token: string
) {
  return await _delete(
    '/api/resource/customization/pipeline',
    buildHeaders({ auth: token, contentType: 'application/json' }),
    buildRequestData({
      data: { _ids: toStringArray(id) },
    })
  );
}
