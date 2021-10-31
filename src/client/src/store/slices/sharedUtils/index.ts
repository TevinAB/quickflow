import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import type {
  ApiError,
  RequestError,
  DocumentThunkArgs,
  EditDocumentThunkArgs,
  DocumentType,
  BaseDocument,
  CreateDocumentThunkArgs,
} from '../../../types';
import { setTimeline } from '../timeline';
import { AppDispatch } from '../..';
import { getRequestErrorData } from '../../../utils';
import {
  getDocumentOne,
  createDocument,
  editDocument,
} from '../../../services/document';
import { showToast } from '../toasts';

export function wrapperGetDocumentPayloadCreator<ThunkReturn>(
  documentType: DocumentType
) {
  const handleGetDocumentPayloadCreator: AsyncThunkPayloadCreator<
    ThunkReturn,
    DocumentThunkArgs,
    { rejectValue: ApiError; dispatch: AppDispatch }
  > = async (args, { dispatch, rejectWithValue }) => {
    try {
      const response = await getDocumentOne(
        documentType,
        args.documentId,
        args.token
      );

      if (!response)
        return rejectWithValue({ message: 'Error fetching contact' });

      dispatch(setTimeline({ timeline: response.data.timeline }));

      return { documentData: response.data.result } as unknown as ThunkReturn;
    } catch (error) {
      const requestError = getRequestErrorData(error as RequestError);

      dispatch(
        showToast({ message: requestError.message, toastType: 'error' })
      );

      return rejectWithValue({ message: requestError.message });
    }
  };

  return handleGetDocumentPayloadCreator;
}

export function wrapperCreateDocumentPayloadCreator<T extends BaseDocument>(
  documentType: DocumentType
) {
  const createDocumentPayloadCreator: AsyncThunkPayloadCreator<
    void,
    CreateDocumentThunkArgs<T>,
    { rejectValue: ApiError; dispatch: AppDispatch }
  > = async (args, { dispatch }) => {
    try {
      const { documentData, metaData, token } = args;
      await createDocument(documentType, documentData, metaData, token);

      dispatch(
        showToast({ message: `${documentType} Added`, toastType: 'success' })
      );
    } catch (error) {
      const requestError = getRequestErrorData(error as RequestError);

      dispatch(
        showToast({ message: requestError.message, toastType: 'error' })
      );
    }
  };

  return createDocumentPayloadCreator;
}

export function wrapperEditDocumentPayloadCreator<
  ThunkReturn,
  T extends BaseDocument
>(documentType: DocumentType) {
  const editDocumentPayloadCreator: AsyncThunkPayloadCreator<
    ThunkReturn,
    EditDocumentThunkArgs<T>,
    { rejectValue: ApiError; dispatch: AppDispatch }
  > = async (args, { rejectWithValue, dispatch }) => {
    try {
      const { documentId, editedData, metaData, token } = args;

      const response = await editDocument(
        documentType,
        documentId,
        editedData,
        metaData,
        token
      );

      dispatch(
        showToast({ message: `${documentType} Edited`, toastType: 'success' })
      );
      dispatch(setTimeline({ timeline: response.data.timeline }));

      return { documentData: response.data.result } as unknown as ThunkReturn;
    } catch (error) {
      const requestError = getRequestErrorData(error as RequestError);

      dispatch(
        showToast({ message: requestError.message, toastType: 'error' })
      );

      return rejectWithValue({ message: requestError.message });
    }
  };

  return editDocumentPayloadCreator;
}
