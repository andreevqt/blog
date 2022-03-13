import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import user from './slices/user';
import posts from './slices/posts';
import error from './slices/error';
import errorMiddleware from './middleware/error';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
  reducer: {
    user,
    posts,
    error
  }
});

export {
  store
};
