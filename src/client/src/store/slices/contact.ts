import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { deleteDocument } from '../../services/document';
import type {
  DocumentStoreState,
  DocumentThunkArgs,
  EditDocumentThunkArgs,
  ApiError,
  RequestError,
  Contact,
  CreateDocumentThunkArgs,
} from '../../types';
import { getRequestErrorData } from '../../utils';
import { RootState } from '..';
import { clearTimelineState } from './timeline';
import { newContactState } from '../../utils/document';
import {
  wrapperCreateDocumentPayloadCreator,
  wrapperGetDocumentPayloadCreator,
  wrapperEditDocumentPayloadCreator,
} from './sharedUtils';
import { showToast } from './toasts';

type ContactState = DocumentStoreState<Contact>;

export const getContactThunk = createAsyncThunk<
  Omit<ContactState, 'isLoading' | 'documentLoadError'>,
  DocumentThunkArgs,
  { rejectValue: ApiError; dispatch: AppDispatch }
>('contact/get', wrapperGetDocumentPayloadCreator('Contact'));

export const createContactThunk = createAsyncThunk<
  void,
  CreateDocumentThunkArgs<Contact>,
  { rejectValue: ApiError; dispatch: AppDispatch }
>('contact/create', wrapperCreateDocumentPayloadCreator('Contact'));

export const editContactThunk = createAsyncThunk<
  Omit<ContactState, 'isLoading' | 'documentLoadError'>,
  EditDocumentThunkArgs<Contact>,
  { rejectValue: ApiError; dispatch: AppDispatch }
>('contact/edit', wrapperEditDocumentPayloadCreator('Contact'));

export const deleteContactThunk = createAsyncThunk<
  void,
  DocumentThunkArgs,
  { state: RootState; rejectValue: ApiError; dispatch: AppDispatch }
>('contact/delete', async (args, { getState, rejectWithValue, dispatch }) => {
  try {
    const { documentId, token } = args;
    const contactInStateId = getState().contact.documentData._id;

    await deleteDocument('Contact', documentId, token);

    if (contactInStateId === documentId) {
      dispatch({ type: 'contact/deleteContactFromState' });
      dispatch(clearTimelineState());
    }
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    dispatch(showToast({ message: requestError.message, toastType: 'error' }));

    return rejectWithValue({ message: requestError.message });
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    documentData: newContactState(),
    isLoading: false,
    documentLoadError: false,
    errorMessage: '',
  } as ContactState,
  reducers: {
    deleteContactFromState(state) {
      state.documentData = newContactState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactThunk.pending, (state) => {
        state.isLoading = true;
        state.documentLoadError = false;
      })
      .addCase(getContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentLoadError = false;
        state.documentData = action.payload.documentData;
      })
      .addCase(getContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.documentLoadError = true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(editContactThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.documentData;
      })
      .addCase(editContactThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteContactThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContactThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteContactThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const contactReducer = contactSlice.reducer;
export const { deleteContactFromState } = contactSlice.actions;
