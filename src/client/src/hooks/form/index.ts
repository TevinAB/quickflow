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
} from '../../types';
import { loginThunk, signUpThunk } from '../../store/slices/user';
//import { hideForm } from '../../store/slices/formManager';
import {
  createContactThunk,
  editContactThunk,
} from '../../store/slices/contact';
import { createDealThunk, editDealThunk } from '../../store/slices/deal';
import { addTimelineItemThunk } from '../../store/slices/timeline';
import { useAppSelector, useAppDispatch } from '../redux';

export function useSubmit() {
  const userName = useAppSelector((state) => state.user.full_name);
  const dispatch = useAppDispatch();

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
          return await dispatch(
            createContactThunk({
              documentData: data as Contact,
              metaData: { initiator: userName },
              token,
            })
          );
        } else if (formMode === 'Edit') {
          return await dispatch(
            editContactThunk({
              documentId: id,
              editedData: data as Contact,
              metaData: { initiator: userName },
              token,
            })
          );
        }
        break;

      case 'Deal':
        if (formMode === 'New') {
          return await dispatch(
            createDealThunk({
              documentData: data as Deal,
              metaData: { initiator: userName },
              token,
            })
          );
        } else if (formMode === 'Edit') {
          return await dispatch(
            editDealThunk({
              documentId: id,
              editedData: data as Deal,
              metaData: { initiator: userName },
              token,
            })
          );
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
        break;

      case 'Login':
        return dispatch(loginThunk(data as LoginData));

      case 'SignUp':
        return dispatch(signUpThunk(data as SignUpData));
    }
  }

  return submit;
}
