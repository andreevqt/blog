import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Theme from '../theme/theme';
import GlobalStyle from '../theme/global-style';
import Home from '../pages/home';

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route to="/" exact>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
