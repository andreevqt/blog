import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
  items: [],
  submited: false,
  currentPost: null,
  page: 1,
  totalPages: 1,
  isLoading: false
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  (pageToGet, { getState, rejectWithValue }) => {
    const { page } = getState().posts;
    return api.posts.list(pageToGet || page).catch((err) => rejectWithValue(err));
  }
);

export const createPost = createAsyncThunk(
  'posts/create',
  async (data, { getState, rejectWithValue }) => {
    try {
      return api.posts.create(data);
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async (data, { getState, rejectWithValue }) => {
    const { id, ...rest } = data;
    try {
      return api.posts.update(id, rest);
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const getPost = createAsyncThunk(
  'posts/get',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { post } = await api.posts.get(id);
      return post;
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
      state.submited = false;
      state.isLoading = false;
      state.currentPost = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const { results, page, totalPages } = action.payload;
      state.page = page;
      state.isLoading = false;
      state.items = results;
      state.totalPages = totalPages;
    });

    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.submited = true;
      state.isLoading = false;
    });

    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.submited = true;
      state.isLoading = false;
    });

    builder.addCase(getPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.currentPost = null;
      state.isLoading = false;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.currentPost = action.payload;
      state.isLoading = false;
    });
  }
});

const { reset } = postsSlice.actions;

export { reset };

export default postsSlice.reducer
