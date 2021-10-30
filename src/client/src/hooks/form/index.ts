import { createDocument, editDocument } from '../../services/document';
import type {
  FormMode,
  FormType,
  LoginData,
  SignUpData,
  HttpRequestMetaData,
  TimelineItemSubmitData,
  Contact,
  Deal,
  DocumentType,
} from '../../types';
import { loginThunk, signUpThunk } from '../../store/slices/user';
import {
  createContactThunk,
  editContactThunk,
} from '../../store/slices/contact';
import { createDealThunk, editDealThunk } from '../../store/slices/deal';
import { addTimelineItemThunk } from '../../store/slices/timeline';
import { getAllDocumentsThunk } from './../../store/slices/documentList';
import { useAppSelector, useAppDispatch } from '../redux';
import { useLocation } from 'react-router-dom';

export function useSubmit() {
  const userName = useAppSelector((state) => state.user.full_name);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleListRefresh = async (
    documentType: DocumentType,
    token: string
  ) => {
    const pathname = location.pathname;

    if (pathname.includes(documentType.toLowerCase())) {
      await dispatch(getAllDocumentsThunk({ documentType, token }));
    }
  };

  async function submit(
    id: string,
    data: Record<string, any>,
    formType: FormType,
    formMode: FormMode,
    token: string
  ) {
    switch (formType) {
      case 'Contact':
        if (formMode === 'New') {
          await dispatch(
            createContactThunk({
              documentData: data as Contact,
              metaData: { initiator: userName },
              token,
            })
          );

          return await handleListRefresh('Contact', token);
        } else if (formMode === 'Edit') {
          await dispatch(
            editContactThunk({
              documentId: id,
              editedData: data as Contact,
              metaData: { initiator: userName },
              token,
            })
          );

          return await handleListRefresh('Contact', token);
        }
        break;

      case 'Deal':
        if (formMode === 'New') {
          await dispatch(
            createDealThunk({
              documentData: data as Deal,
              metaData: { initiator: userName },
              token,
            })
          );

          return await handleListRefresh('Deal', token);
        } else if (formMode === 'Edit') {
          await dispatch(
            editDealThunk({
              documentId: id,
              editedData: data as Deal,
              metaData: { initiator: userName },
              token,
            })
          );

          return await handleListRefresh('Deal', token);
        }
        break;

      case 'Account':
        const meta: HttpRequestMetaData = {
          initiator: userName,
        };

        if (formMode === 'New') {
          return await createDocument(formType, data, meta, token);
        } else if (formMode === 'Edit') {
          return await editDocument(formType, id, data, meta, token);
        }
        break;

      case 'Note':
        if (!data.hasOwnProperty('item_type')) data.item_type = 'Note';
        if (!data.hasOwnProperty('item_body')) data.item_body = '';

        const actionResult = await dispatch(
          addTimelineItemThunk({
            itemData: data as TimelineItemSubmitData,
            meta: { initiator: userName },
            token,
          })
        );

        if (addTimelineItemThunk.rejected.match(actionResult)) {
          // show toast
        }
        return;

      case 'Login':
        return dispatch(loginThunk(data as LoginData));

      case 'SignUp':
        return dispatch(signUpThunk(data as SignUpData));
    }
  }

  return submit;
}
