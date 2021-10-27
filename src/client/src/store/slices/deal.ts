import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import {
  getDocumentOne,
  editDocument,
  createDocument,
  deleteDocument,
} from '../../services/document';
import type {
  Deal,
  DocumentStoreState,
  DocumentThunkArgs,
  RequestError,
  ApiError,
  HttpRequestMetaData,
} from '../../types';
import { getRequestErrorData } from '../../utils';
import { newDealState, newTimelineState } from '../../utils/document';

type DealState = DocumentStoreState<Deal>;

export const getDealThunk = createAsyncThunk<
  Omit<DealState, 'isLoading' | 'documentLoadError'>,
  DocumentThunkArgs,
  { rejectValue: ApiError }
>('deal/get', async (args, { rejectWithValue }) => {
  try {
    const { documentId, token } = args;

    const response = await getDocumentOne('Deal', documentId, token);

    if (!response) return rejectWithValue({ message: 'Error fetching deal' });

    return {
      documentData: response.data.result,
      timelineData: response.data.timeline,
    };
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

export const createDealThunk = createAsyncThunk<
  Omit<DealState, 'isLoading' | 'documentLoadError'>,
  Omit<DocumentThunkArgs, 'documentId'> & {
    dealData: Deal;
    metaData: HttpRequestMetaData;
  },
  { rejectValue: ApiError }
>('deal/create', async (args, { rejectWithValue }) => {
  try {
    const { dealData, metaData, token } = args;

    const response = await createDocument('Deal', dealData, metaData, token);

    return {
      documentData: response.data.result,
      timelineData: response.data.timeline,
    };
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

export const editDealThunk = createAsyncThunk<
  Omit<DealState, 'isLoading' | 'documentLoadError'>,
  DocumentThunkArgs & { editedDealData: Deal; metaData: HttpRequestMetaData },
  { rejectValue: ApiError }
>('deal/edit', async (args, { rejectWithValue }) => {
  try {
    const { editedDealData, metaData, documentId, token } = args;
    const response = await editDocument(
      'Deal',
      documentId,
      editedDealData,
      metaData,
      token
    );

    return {
      documentData: response.data.result,
      timelineData: response.data.timeline,
    };
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

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

    //dispatch remove deal from deal list action
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

const dealSlice = createSlice({
  name: 'deal',
  initialState: {
    documentData: newDealState(),
    timelineData: newTimelineState(),
    documentLoadError: false,
    errorMessage: '',
    isLoading: false,
  } as DealState,
  reducers: {
    deleteDealFromState(state) {
      state.documentData = newDealState();
      state.timelineData = newTimelineState();
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
        state.timelineData = action.payload.timelineData;
        state.isLoading = false;
        state.documentLoadError = false;
      })
      .addCase(getDealThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
        state.documentLoadError = true;
      })
      .addCase(createDealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealThunk.fulfilled, (state, action) => {
        state.documentData = action.payload.documentData;
        state.timelineData = action.payload.timelineData;
        state.isLoading = false;
      })
      .addCase(createDealThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(editDealThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDealThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.documentData;
        state.timelineData = action.payload.timelineData;
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
