import React, { useState, useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { AuthContext } from './components/Hooks/Auth';
import styles from './App.module.css';
import Landing from './containers/Landing/Landing';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './containers/Profile/Profile';
import Navbar from './containers/Navbar/Navbar';
import Loader from './components/Loader/Loader';

function App() {
  const [authToken, setAuthToken] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();

  // load token from localstorage
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);
  // load User
  useEffect(() => {
    if (authToken) {
      fetch('http://localhost:4000/api/userdetails', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      })
        .then(response => response.json())
        .then(user => {
          setCurrentUser(user);
        });
    }
  }, [authToken]);
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, currentUser, setCurrentUser }}>
      <Switch>
        <Route exact path="/">
          {authToken ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : (
            <Landing />
          )}
        </Route>
        <Route exact path="/loader">
          <Loader />
        </Route>
        <Route exact path="/register">
          {authToken ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : (
            <Landing />
          )}
        </Route>
        <ProtectedRoute path="/admin">
          {' '}
          <Admin />{' '}
        </ProtectedRoute>
        <Route exact path="/profile">
          {' '}
          <Navbar />
          <Profile />{' '}
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
