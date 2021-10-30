import {
  LoginData,
  ApiError,
  SignUpData,
  Notification,
} from './../../types/index';
import { TOKEN_NAME } from '../../constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signUp, isAuthenticated } from '../../services/auth';
import { readNotifications } from '../../services/profiles';
import {
  removeFromLocalStorage,
  writeToLocalStorage,
} from '../../utils/localStorage';
import { RootState } from '..';

interface UserState {
  is_authenticated: boolean;
  _id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  org_name: string;
  is_admin: boolean;
  notifications: Array<Notification>;
  token: string;
  is_loading: boolean;
  error_message: string;
  notif_error_msg: string;
}

export const isAuthenticatedThunk = createAsyncThunk<
  UserState,
  string,
  { rejectValue: boolean }
>('user/is_authenticated', async (token, { rejectWithValue }) => {
  try {
    const result = await isAuthenticated(token);

    const userState = result?.data.result as UserState;

    return userState;
  } catch (error) {
    return rejectWithValue(false);
  }
});

export const loginThunk = createAsyncThunk<
  UserState,
  LoginData,
  { rejectValue: ApiError }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const result = await login(data);

    const userData = result.data;
    const state = {
      ...userData.result,
      token: userData.token,
    } as UserState;

    return state;
  } catch (error) {
    return rejectWithValue(error as ApiError);
  }
});

export const signUpThunk = createAsyncThunk<
  UserState,
  SignUpData,
  { rejectValue: ApiError }
>('user/sign_up', async (data, { rejectWithValue }) => {
  try {
    const result = await signUp(data);

    const userData = result.data;
    const state = {
      ...userData.result,
      token: userData.token,
    } as UserState;

    return state;
  } catch (error) {
    return rejectWithValue(error as ApiError);
  }
});

export const readNotifThunk = createAsyncThunk<
  { notifications: Array<Notification> },
  unknown,
  { state: RootState; rejectValue: ApiError }
>('user/read_notif', async (_, { getState, rejectWithValue }) => {
  try {
    const { _id, token } = getState().user;
    const result = await readNotifications(_id, token);

    return result.data as { notifications: Array<Notification> };
  } catch (error) {
    return rejectWithValue(error as ApiError);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: clearState(),
  reducers: {
    logout() {
      removeFromLocalStorage(TOKEN_NAME);
      return clearState();
    },
    resumeSession(
      _,
      action: {
        payload: { userData: UserState };
      }
    ) {
      return initUserStateOnAuth(action.payload.userData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(loginThunk.fulfilled, (_, action) => {
        writeToLocalStorage(TOKEN_NAME, action.payload.token);

        return initUserStateOnAuth(action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.is_loading = false;
        state.is_authenticated = false;
        state.error_message = action.payload?.message || 'Login failed.';
      })
      .addCase(signUpThunk.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(signUpThunk.fulfilled, (_, action) => {
        writeToLocalStorage(TOKEN_NAME, action.payload.token);

        return initUserStateOnAuth(action.payload);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.is_loading = false;
        state.error_message = action.payload?.message || 'Sign Up failed.';
      })
      .addCase(readNotifThunk.fulfilled, (state, action) => {
        state.notifications = action.payload.notifications;
      })
      .addCase(readNotifThunk.rejected, (state, action) => {
        state.notif_error_msg =
          action.payload?.message || 'Failed to read notifications.';
      });
  },
});

function initUserStateOnAuth(userData: UserState) {
  return {
    ...userData,
    is_authenticated: true,
    full_name: `${userData.first_name} ${userData.last_name}`,
    is_loading: false,
    error_message: '',
  } as UserState;
}

function clearState() {
  return {
    is_authenticated: false,
    token: '',
    _id: '',
    full_name: '',
    first_name: '',
    last_name: '',
    email: '',
    org_name: '',
    notifications: [],
    is_admin: false,
    is_loading: false,
    error_message: '',
    notif_error_msg: '',
  } as UserState;
}

//export reducers
export const userReducer = userSlice.reducer;

//export logout action creator
export const { logout, resumeSession } = userSlice.actions;
