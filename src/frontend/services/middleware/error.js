import { setError } from '../slices/error';

const error = ({ getState, dispatch }) => (next) => (action) => {
  if (action.type === 'error/setError' || action.type.endsWith('/rejected')) {
    return next(action);
  }

  const { lastErr } = getState().error;
  if (lastErr) {
    dispatch(setError(null));
  }

  next(action);
};

export default error;
