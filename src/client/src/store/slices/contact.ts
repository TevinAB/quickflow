import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import {
  getDocumentOne,
  createDocument,
  editDocument,
  deleteDocument,
} from '../../services/document';
import type {
  DocumentStoreState,
  DocumentThunkArgs,
  ApiError,
  RequestError,
  Contact,
  HttpRequestMetaData,
} from '../../types';
import { getRequestErrorData } from '../../utils';
import { newContactState, newTimelineState } from '../../utils/document';

type ContactState = DocumentStoreState<Contact>;

export const getContactThunk = createAsyncThunk<
  Omit<ContactState, 'isLoading' | 'documentLoadError'>,
  DocumentThunkArgs,
  { rejectValue: ApiError }
>('contact/get', async (args, { rejectWithValue }) => {
  try {
    const response = await getDocumentOne(
      'Contact',
      args.documentId,
      args.token
    );

    //TODO: dispatch a toast here -- 'Error, contact not retrieved
    if (!response)
      return rejectWithValue({ message: 'Error fetching contact' });

    return {
      documentData: response.data.result,
      timelineData: response.data.timeline,
    };
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

export const createContactThunk = createAsyncThunk<
  Omit<ContactState, 'isLoading' | 'documentLoadError'>,
  { documentData: Contact; metaData: HttpRequestMetaData; token: string },
  { rejectValue: ApiError }
>('contact/create', async (args, { rejectWithValue }) => {
  try {
    const { documentData, metaData, token } = args;
    const response = await createDocument(
      'Contact',
      documentData,
      metaData,
      token
    );

    //TODO: dispatch contact-list getContacts action to refresh list

    return {
      documentData: response.data.result,
      timelineData: response.data.timeline,
    };
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

export const editContactThunk = createAsyncThunk<
  Omit<ContactState, 'isLoading' | 'documentLoadError'>,
  { editedData: Contact; metaData: HttpRequestMetaData } & DocumentThunkArgs,
  { rejectValue: ApiError }
>('contact/edit', async (args, { rejectWithValue }) => {
  try {
    const { documentId, editedData, metaData, token } = args;

    const response = await editDocument(
      'Contact',
      documentId,
      editedData,
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

export const deleteContactThunk = createAsyncThunk<
  void,
  DocumentThunkArgs,
  { state: ContactState; rejectValue: ApiError; dispatch: AppDispatch }
>('contact/delete', async (args, { getState, rejectWithValue, dispatch }) => {
  try {
    const { documentId, token } = args;
    const contactInStateId = getState().documentData._id;

    await deleteDocument('Contact', documentId, token);

    //TODO: dispatch contact-list filter update

    if (contactInStateId === documentId) {
      dispatch({ type: 'contact/deleteContactFromState' });
    }
  } catch (error) {
    const requestError = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message: requestError.message });
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    documentData: newContactState(),
    timelineData: newTimelineState(),
    isLoading: false,
    documentLoadError: false,
    errorMessage: '',
  } as ContactState,
  reducers: {
    deleteContactFromState(state) {
      state.documentData = newContactState();
      state.timelineData = newTimelineState();
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
        state.timelineData = action.payload.timelineData;
      })
      .addCase(getContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.documentLoadError = true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(createContactThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.documentData;
        state.timelineData = action.payload.timelineData;
      })
      .addCase(createContactThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editContactThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentData = action.payload.documentData;
        state.timelineData = action.payload.timelineData;
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
