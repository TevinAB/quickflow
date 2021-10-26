import { createDocument, editDocument } from '../../services/document';
import type { FormMode, FormType, LoginData, SignUpData } from '../../types';
import { loginThunk, signUpThunk } from '../../store/slices/user';
import { useDispatch } from 'react-redux';

export function useSubmit() {
  const dispatch = useDispatch();

  async function submit(
    id: string,
    data: {},
    formType: FormType,
    formMode: FormMode,
    token: string
  ) {
    switch (formType) {
      case 'Contact':
        if (formMode === 'New') {
          return await createDocument('Contact', data, token);
        } else if (formMode === 'Edit') {
          return await editDocument('Contact', id, data, token);
        }
        break;

      case 'Account':
        if (formMode === 'New') {
          return await createDocument('Account', data, token);
        } else if (formMode === 'Edit') {
          return await editDocument('Account', id, data, token);
        }
        break;

      case 'Deal':
        if (formMode === 'New') {
          return await createDocument('Deal', data, token);
        } else if (formMode === 'Edit') {
          return await editDocument('Deal', id, data, token);
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
