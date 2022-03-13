import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Theme from '../theme/theme';
import GlobalStyle from '../theme/global-style';
import Home from '../pages/home';
import Login from '../pages/login';
import Logout from '../pages/logout';
import Register from '../pages/register';
import CreatePost from '../pages/create-post';
import EditPost from '../pages/edit-post';
import { getUser } from '../services/slices/user';
import PrivateRoute from './private-route';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Theme>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
          <PrivateRoute path="/post/add" exact>
            <CreatePost />
          </PrivateRoute>
          <PrivateRoute path="/post/:id" exact>
            <EditPost />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
