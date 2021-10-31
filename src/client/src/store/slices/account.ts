import { AppDispatch, RootState } from '..';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  wrapperCreateDocumentPayloadCreator,
  wrapperGetDocumentPayloadCreator,
  wrapperEditDocumentPayloadCreator,
} from './sharedUtils';
import type {
  Account,
  DocumentStoreState,
  ApiError,
  DocumentThunkArgs,
  CreateDocumentThunkArgs,
  EditDocumentThunkArgs,
  RequestError,
} from '../../types';
import { deleteDocument } from '../../services/document';
import { clearTimelineState } from './timeline';
import { getRequestErrorData } from '../../utils';
import { newAccountState } from '../../utils/document';

type AccountState = DocumentStoreState<Account>;

export const getAccountThunk = createAsyncThunk<
  Omit<AccountState, 'isLoading' | 'documentLoadError'>,
  DocumentThunkArgs,
  { rejectValue: ApiError; dispatch: AppDispatch }
>('account/get', wrapperGetDocumentPayloadCreator('Account'));

export const createAccountThunk = createAsyncThunk<
  void,
  CreateDocumentThunkArgs<Account>,
  { rejectValue: ApiError; dispatch: AppDispatch }
>('account/create', wrapperCreateDocumentPayloadCreator('Account'));

export const editAccountThunk = createAsyncThunk<
  Omit<AccountState, 'isLoading' | 'documentLoadError'>,
  EditDocumentThunkArgs<Account>,
  { rejectValue: ApiError; dispatch: AppDispatch }
>('account/edit', wrapperEditDocumentPayloadCreator('Account'));

export const deleteAccountThunk = createAsyncThunk<
  void,
  DocumentThunkArgs,
  { state: RootState; rejectValue: ApiError; dispatch: AppDispatch }
>('account/delete', async (args, { getState, rejectWithValue, dispatch }) => {
  try {
    const { documentId, token } = args;
    const accountInStateId = getState().account.documentData._id;

    await deleteDocument('Account', documentId, token);

    if (accountInStateId === documentId) {
      dispatch({ type: 'account/deleteAccountFromState' });
      dispatch(clearTimelineState());
    }
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    documentData: newAccountState(),
    isLoading: false,
    documentLoadError: false,
    errorMessage: '',
  } as AccountState,
  reducers: {
    deleteAccountFromState(state) {
      state.documentData = newAccountState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountThunk.pending, (state) => {
        state.isLoading = true;
        state.documentLoadError = false;
      })
      .addCase(getAccountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentLoadError = false;
        state.documentData = action.payload.documentData;
      })
      .addCase(getAccountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.documentLoadError = true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(editAccountThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAccountThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.documentData;
      })
      .addCase(editAccountThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAccountThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAccountThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const accountReducer = accountSlice.reducer;

export const { deleteAccountFromState } = accountSlice.actions;
