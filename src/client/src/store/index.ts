import { userReducer } from './slices/user';
import { formManagerReducer } from './slices/formManager';
import { contactReducer } from './slices/contact';
import { timelineReducer } from './slices/timeline';
import { documentsReducer } from './slices/documentList';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    timeline: timelineReducer,
    documents: documentsReducer,
    contact: contactReducer,
    formManager: formManagerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
