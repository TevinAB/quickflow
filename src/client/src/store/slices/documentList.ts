import type {
  ApiDocFormat,
  DocumentType,
  ApiError,
  RequestError,
} from './../../types';
import { getDocumentAll, deleteDocument } from '../../services/document';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { getRequestErrorData } from '../../utils';

export const getAllDocumentsThunk = createAsyncThunk<
  Array<ApiDocFormat>,
  { documentType: DocumentType; token: string },
  { rejectValue: ApiError }
>('documents/get', async (args, { rejectWithValue }) => {
  try {
    const { documentType, token } = args;

    const response = await getDocumentAll(documentType, token);
    if (response) {
      return response?.data.result;
    } else {
      return rejectWithValue({ message: 'Documents failed to load.' });
    }
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

export const deleteDocumentsThunk = createAsyncThunk<
  void,
  { documentIds: Array<string>; documentType: DocumentType; token: string },
  { rejectValue: ApiError; dispatch: AppDispatch }
>('documents/delete', async (args, { rejectWithValue, dispatch }) => {
  try {
    const { documentIds, documentType, token } = args;
    await deleteDocument(documentType, documentIds, token);

    //refresh the list after deleting (n) items
    await dispatch(getAllDocumentsThunk({ documentType, token }));

    //show toast
  } catch (error) {
    //show toast
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

const documentListSlice = createSlice({
  name: 'documents',
  initialState: {
    isLoading: false,
    documents: [] as Array<ApiDocFormat>,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDocumentsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDocumentsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      });
  },
});

export const documentsReducer = documentListSlice.reducer;
