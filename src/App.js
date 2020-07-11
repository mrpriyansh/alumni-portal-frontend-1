import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadPopUp from './components/UploadPopUp/UploadPopUp';
import { AuthContext } from './components/Hooks/Auth';
import Landing from './scenes/Landing/Landing';
import Home from './scenes/Home/Home';
import Admin from './scenes/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './scenes/Profile/Profile';
import Navbar from './scenes/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Members from './scenes/Members/Members';
import config from './services/config';
import EditProfilePic from './components/EditProfilePic/EditProfilePic';
import handleError from './services/handleError';

function App() {
  const [authToken, setAuthToken] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // load token from localstorage
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // load token from localstorage
  window.onstorage = () => {
    const token = window.localStorage.getItem('token');
    setAuthToken(token);
  };
  useEffect(() => {
    if (authToken) {
      fetch(`${config.apiUrl}/api/userdetails`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res => {
          if (res.status === 200) {
            setCurrentUser(res.body);
          } else {
            throw res;
          }
        })
        .catch(err => {
          handleError(err, setAuthToken);
        });
    }
  }, [authToken]);
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, currentUser, setCurrentUser }}>
      <Switch>
        <Route exact path="/uploadpop">
          <UploadPopUp />
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
        <ProtectedRoute path="/admin">
          <Navbar />
          <Admin />{' '}
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/:profileId">
          {' '}
          <Navbar />
          <Profile />{' '}
        </ProtectedRoute>
        <ProtectedRoute exact path="/members">
          <Navbar />
          <Members />
        </ProtectedRoute>
        <Route exact path="/test">
          <EditProfilePic />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
