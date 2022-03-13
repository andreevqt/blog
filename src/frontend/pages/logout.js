import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../services/slices/user';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser(() => history.replace({ pathname: '/' })));
  }, []);

  return null;
};

export default Logout;
