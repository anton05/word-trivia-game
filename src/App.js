import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';

import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Home from './Pages/Home/Home'
import Game from './Pages/Game/Game'
import Profile from './Pages/Profile/Profile'
import Leaderboard from './Pages/Leaderboard/Leaderboard'
import UserUpdate from './Pages/UserUpadate/UserUpdate';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

import styled from "@emotion/styled";

const App = () => {
  return (
      <AuthProvider>
        <Wrap>
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />} >
                <Route exact path='/' element={<Home/>}/>
                <Route path="/game" element={<Game />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/update" element={<UserUpdate />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
          </Routes>
        </Wrap>
    </AuthProvider>
  );
}

export default App;

const Wrap = styled.div``;
