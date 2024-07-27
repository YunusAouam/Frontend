import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import EmailVerify from './components/auth/EmailVerify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, verifyUserSession } from './slices/authSlice';
import Dashboard from './pages/Dashboard';
import RootLayout from './layouts/RootLayout';
import { useEffect } from 'react';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import { gapi } from 'gapi-script';
import axios from 'axios';

function App() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setUser());
    }, [dispatch]);
    useEffect(()=>{
        if(auth.user){
            dispatch(verifyUserSession({token:auth.token}));
        }
    }, [dispatch, auth])
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId:"87480562921-64nlsstp2ubhue6dcgdgpaifh3qnvuc3.apps.googleusercontent.com",
                scope:""
            });
        }

        gapi.load("client:auth2", start);
    });
  return (
      <BrowserRouter>
          <Routes>
                <Route path='/forgot-password' element={<ForgotPassword />} />
                {/* <Route path='/' element={auth.user ? <Home /> : } /> */}
                <Route path="/users/:id/verify/:token" element={ <EmailVerify /> } />
                <Route path="/users/:userId/reset/:token" element={ <ResetPassword /> } />
                <Route path="/" element={ auth.user ? <RootLayout /> : <Home /> }>
                    <Route index element={<Dashboard />} />
                    {/* <Route path="profile" element={<Profile />} /> */}
                </Route>

          </Routes>

      </BrowserRouter>
  );
}

export default App;
