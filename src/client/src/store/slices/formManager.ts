import type { FormType, FormMode } from './../../types';
import { createSlice } from '@reduxjs/toolkit';

interface FormManagerState {
  formType: FormType;
  formMode: FormMode;
  /**Id of the document being edited */
  itemId: string;
}

const formManager = createSlice({
  name: 'formManager',
  initialState: {
    formType: 'none',
    formMode: 'none',
    itemId: '',
  } as FormManagerState,
  reducers: {
    showForm(
      state,
      action: {
        type: string;
        payload: { formMode: FormMode; formType: FormType; _id: string };
      }
    ) {
      state.formMode = action.payload.formMode;
      state.formType = action.payload.formType;
      state.itemId = action.payload._id;
    },

    hideForm(state) {
      state.formMode = 'none';
      state.formType = 'none';
      state.itemId = '';
    },
  },
});

export const formManagerReducer = formManager.reducer;

export const { showForm, hideForm } = formManager.actions;
