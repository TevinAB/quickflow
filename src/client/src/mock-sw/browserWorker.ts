import { allHandlers } from './sharedWorker';
import { setupWorker } from 'msw';

export const worker = setupWorker(...allHandlers);
