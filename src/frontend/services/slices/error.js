import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastErr: null
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.lastErr = action.payload;
    }
  }
});

const { setError } = errorSlice.actions;

export { setError };

export default errorSlice.reducer;
