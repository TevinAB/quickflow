import { authHandlers } from './auth';
import { formDataHanlders } from './formData';
import { roleHandlers } from './roles';
import { profileHandlers } from './profiles';
import { contactHandlers } from './contacts';
import { dealHandlers } from './deals';
import { timelineHandlers } from './timeline';
import { eventRouteHandlers } from './events';
import { pipelineHandlers } from './pipelines';
import { searchHandlers } from './search';

export const allHandlers = [
  ...authHandlers,
  ...formDataHanlders,
  ...roleHandlers,
  ...profileHandlers,
  ...contactHandlers,
  ...dealHandlers,
  ...timelineHandlers,
  ...eventRouteHandlers,
  ...pipelineHandlers,
  ...searchHandlers,
];
