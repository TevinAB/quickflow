import { createDocument, editDocument } from '../../services/document';
import type {
  FormMode,
  FormType,
  LoginData,
  SignUpData,
  HttpRequestMetaData,
} from '../../types';
import { loginThunk, signUpThunk } from '../../store/slices/user';
import { useAppSelector } from '../redux';
import { useDispatch } from 'react-redux';

export function useSubmit() {
  const userName = useAppSelector((state) => state.user.full_name);
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
      case 'Account':
      case 'Deal':
        const meta: HttpRequestMetaData = {
          initiator: userName,
        };

        if (formMode === 'New') {
          return await createDocument(formType, data, meta, token);
        } else if (formMode === 'Edit') {
          return await editDocument(formType, id, meta, data, token);
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
