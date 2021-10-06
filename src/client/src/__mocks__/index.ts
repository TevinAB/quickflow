import { formDataHanlders } from './formData';
import { roleHandlers } from './roles';
import { profileHandlers } from './profiles';
import { contactHandlers } from './contacts';
import { dealHandlers } from './deals';
import { timelineHandlers } from './timeline';
import { eventRouteHandlers } from './events';
import { searchHandlers } from './search';
import { setupWorker } from 'msw';

export const worker = setupWorker(
  ...formDataHanlders,
  ...roleHandlers,
  ...profileHandlers,
  ...contactHandlers,
  ...dealHandlers,
  ...timelineHandlers,
  ...eventRouteHandlers,
  ...searchHandlers
);
