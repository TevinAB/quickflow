import type { ToastType } from './../../types/index';
import { createSlice } from '@reduxjs/toolkit';

const toastManagerSlice = createSlice({
  name: 'toastManager',
  initialState: {
    message: '',
    toastType: 'info' as ToastType,
  },
  reducers: {
    showToast(
      state,
      action: { payload: { message: string; toastType: ToastType } }
    ) {
      state.message = action.payload.message;
      state.toastType = action.payload.toastType;
    },
    hideToast(state) {
      state.message = '';
      state.toastType = 'info';
    },
  },
});

export const toastReducer = toastManagerSlice.reducer;

export const { showToast, hideToast } = toastManagerSlice.actions;
