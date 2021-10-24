import { userReducer } from './slices/user';
import { formManagerReducer } from './slices/formManager';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    formManager: formManagerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
