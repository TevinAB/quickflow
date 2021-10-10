import { LoginData, ApiError, SignUpData } from './../../types/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signUp } from '../../services/auth';
import { readNotifications } from '../../services/profiles';
import {
  removeFromLocalStorage,
  writeToLocalStorage,
} from '../../utils/localStorage';

const TOKEN_NAME = 'auth_token';

interface Notification {
  title: string;
  read: boolean;
  type: string;
  added: string | Date;
}

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

export const loginThunk = createAsyncThunk<
  UserState,
  LoginData,
  { rejectValue: ApiError }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const result = await login(data);

    return result.data as UserState;
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

    return result.data as UserState;
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
  initialState: {} as UserState,
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
export const { logout } = userSlice.actions;
