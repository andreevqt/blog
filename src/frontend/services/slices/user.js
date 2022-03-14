import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { setError } from './error';
import omit from 'lodash/omit';
import Cookie from 'js-cookie';

const initialState = {
  user: null,
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { user } = await api.user.login(data);
      Cookie.set('accessToken', user.tokens.access);
      Cookie.set('refreshToken', user.tokens.refresh);
      return omit(user, 'tokens');
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    };
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { user } = await api.user.register(data);
      Cookie.set('accessToken', user.tokens.access);
      Cookie.set('refreshToken', user.tokens.refresh);
      return omit(user, 'tokens');
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    };
  }
);

export const getUser = createAsyncThunk(
  'user/get',
  async (arg, { getState, rejectWithValue, dispatch }) => {
    try {
      const { user } = await api.user.get();
      return user;
    } catch (err) {
      if (typeof err === 'string') {
        return;
      }

      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (cb, { }) => {
    try {
      const refreshToken = Cookie.get('refreshToken');
      await api.user.logout(refreshToken);
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    } finally  {
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      if (cb) {
        cb();
      }
    };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
    });
  }
});

export default userSlice.reducer
