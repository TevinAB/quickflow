import { authHandlers } from './auth';
import { formDataHanlders } from './formData';
import { roleHandlers } from './roles';
import { profileHandlers } from './profiles';
import { contactHandlers } from './contacts';
import { dealHandlers } from './deals';
import { timelineHandlers } from './timeline';
import { eventRouteHandlers } from './events';
import { searchHandlers } from './search';
import { setupServer } from 'msw/node';

//for testing locally in node
export const serverWorker = setupServer(
  ...authHandlers,
  ...formDataHanlders,
  ...roleHandlers,
  ...profileHandlers,
  ...contactHandlers,
  ...dealHandlers,
  ...timelineHandlers,
  ...eventRouteHandlers,
  ...searchHandlers
);
