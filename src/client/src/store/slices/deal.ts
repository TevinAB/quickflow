import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { deleteDocument } from '../../services/document';
import type {
  Deal,
  DocumentStoreState,
  DocumentThunkArgs,
  RequestError,
  ApiError,
  CreateDocumentThunkArgs,
  EditDocumentThunkArgs,
} from '../../types';
import {
  wrapperGetDocumentPayloadCreator,
  wrapperCreateDocumentPayloadCreator,
  wrapperEditDocumentPayloadCreator,
} from './sharedUtils';
import { getRequestErrorData } from '../../utils';
import { newDealState } from '../../utils/document';

type DealState = DocumentStoreState<Deal>;

export const getDealThunk = createAsyncThunk<
  Omit<DealState, 'isLoading' | 'documentLoadError'>,
  DocumentThunkArgs,
  { rejectValue: ApiError }
>('deal/get', wrapperGetDocumentPayloadCreator('Deal'));

export const createDealThunk = createAsyncThunk<
  void,
  CreateDocumentThunkArgs<Deal>,
  { rejectValue: ApiError }
>('deal/create', wrapperCreateDocumentPayloadCreator('Deal'));

export const editDealThunk = createAsyncThunk<
  Omit<DealState, 'isLoading' | 'documentLoadError'>,
  EditDocumentThunkArgs<Deal>,
  { rejectValue: ApiError }
>('deal/edit', wrapperEditDocumentPayloadCreator('Deal'));

export const deleteDealThunk = createAsyncThunk<
  void,
  DocumentThunkArgs,
  { rejectValue: ApiError; state: DealState; dispatch: AppDispatch }
>('deal/delete', async (args, { getState, dispatch, rejectWithValue }) => {
  try {
    const dealInStateId = getState().documentData._id;
    const { documentId, token } = args;
    await deleteDocument('Deal', documentId, token);

    if (dealInStateId === documentId) {
      dispatch({ type: 'deal/deleteDealFromState' });
    }

    //TODO: dispatch contact-list filter update
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

const dealSlice = createSlice({
  name: 'deal',
  initialState: {
    documentData: newDealState(),
    documentLoadError: false,
    errorMessage: '',
    isLoading: false,
  } as DealState,
  reducers: {
    deleteDealFromState(state) {
      state.documentData = newDealState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDealThunk.pending, (state) => {
        state.isLoading = true;
        state.documentLoadError = false;
      })
      .addCase(getDealThunk.fulfilled, (state, action) => {
        state.documentData = action.payload.documentData;
        state.isLoading = false;
        state.documentLoadError = false;
      })
      .addCase(getDealThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
        state.documentLoadError = true;
      })
      .addCase(editDealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDealThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.documentData;
      })
      .addCase(editDealThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(deleteDealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteDealThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
  },
});

export const dealReducer = dealSlice.reducer;

export const { deleteDealFromState } = dealSlice.actions;
