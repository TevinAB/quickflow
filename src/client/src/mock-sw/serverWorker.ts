import { allHandlers } from './sharedWorker';
import { setupServer } from 'msw/node';

//for testing locally in node
export const serverWorker = setupServer(...allHandlers);
