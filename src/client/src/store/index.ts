import { userReducer } from './slices/user';
import { formManagerReducer } from './slices/formManager';
import { contactReducer } from './slices/contact';
import { accountReducer } from './slices/account';
import { dealReducer } from './slices/deal';
import { timelineReducer } from './slices/timeline';
import { documentsReducer } from './slices/documentList';
import { toastReducer } from './slices/toasts';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    timeline: timelineReducer,
    documents: documentsReducer,
    contact: contactReducer,
    account: accountReducer,
    deal: dealReducer,
    formManager: formManagerReducer,
    toastMananger: toastReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
