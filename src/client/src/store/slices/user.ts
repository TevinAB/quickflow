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

interface UserState {
  _id: string;
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
  { state: UserState; rejectValue: ApiError }
>('user/read_notif', async (_, { getState, rejectWithValue }) => {
  try {
    const { _id, token } = getState();
    const result = await readNotifications(_id, token);

    return result.data as { notifications: Array<Notification> };
  } catch (error) {
    return rejectWithValue(error as ApiError);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    org_name: '',
    notifications: [],
    is_admin: false,
    is_loading: false,
    error_message: '',
    notif_error_msg: '',
  } as UserState,
  reducers: {
    logout(state) {
      state._id = '';
      state.token = '';
      state.first_name = '';
      state.last_name = '';
      state.email = '';
      state.notifications = [];
      state.is_admin = false;
      state.org_name = '';
      state.is_loading = false;
      state.error_message = '';
      state.notif_error_msg = '';

      removeFromLocalStorage(TOKEN_NAME);
    },
    resumeSession(
      state,
      action: {
        payload: { userData: UserState };
      }
    ) {
      state = action.payload.userData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state = action.payload;
        state.is_loading = false;
        state.error_message = '';

        writeToLocalStorage(TOKEN_NAME, action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.is_loading = false;
        state.error_message = action.payload?.message || 'Login failed.';
      })
      .addCase(signUpThunk.pending, (state) => {
        state.is_loading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state = action.payload;
        state.is_loading = false;
        state.error_message = '';

        writeToLocalStorage(TOKEN_NAME, action.payload.token);
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

//export reducers
export const userReducer = userSlice.reducer;

//export logout action creator
export const { logout, resumeSession } = userSlice.actions;
