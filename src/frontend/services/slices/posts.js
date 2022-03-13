import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
  items: [],
  page: 1,
  hasMore: true,
  isLoading: false
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  (args, { getState, dispatch, rejectWithValue }) => {
    const { page } = getState().posts;
    return api.posts.list(page).catch((err) => rejectWithValue(err));
  },
  {
    condition: (args, { getState }) => {
      const { hasMore } = getState().posts;
      return hasMore;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const { results, page, totalPages } = action.payload;

      state.isLoading = false;
      state.items = [...state.items, ...results];

      if (state.page < totalPages) {
        state.page++;
      }

      state.hasMore = totalPages !== page;
    })
  }
});

export default postsSlice.reducer
