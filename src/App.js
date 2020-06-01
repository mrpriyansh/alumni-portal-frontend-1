import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadPopUp from './components/UploadPopUp/UploadPopUp';
import { AuthContext } from './components/Hooks/Auth';
import Landing from './containers/Landing/Landing';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './containers/Profile/Profile';
import Navbar from './containers/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Members from './containers/Members/Members';
import config from './utils/config';
import EditProfilePic from './components/EditProfilePic/EditProfilePic';

function App() {
  const [authToken, setAuthToken] = useState(false);
  const [currentUser, setCurrentUser] = useState();

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
        .then(response => response.json())
        .then(user => {
          setCurrentUser(user);
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
