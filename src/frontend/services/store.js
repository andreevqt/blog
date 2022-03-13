import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import user from './slices/user';
import posts from './slices/posts';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    user,
    posts
  }
});

export {
  store
};
