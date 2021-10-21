import { authHandlers } from './auth';
import { formDataHanlders } from './formData';
import { roleHandlers } from './roles';
import { profileHandlers } from './profiles';
import { contactHandlers } from './contacts';
import { dealHandlers } from './deals';
import { timelineHandlers } from './timeline';
import { activityRouteHandlers } from './activities';
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
  ...activityRouteHandlers,
  ...pipelineHandlers,
  ...searchHandlers,
];
