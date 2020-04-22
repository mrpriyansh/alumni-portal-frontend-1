import React, { useState, useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { AuthContext } from './components/Hooks/Auth';
import styles from './App.module.css';
import Landing from './containers/Landing/Landing';
import Home from './components/Home/Home';

function App() {
  const [authToken, setAuthToken] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, currentUser }}>
      <Switch>
        <Route exact path="/">
          {authToken ? <Home /> : <Landing />}
        </Route>
        <Route exact path="/register">
          {authToken ? <Home /> : <Landing />}
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
