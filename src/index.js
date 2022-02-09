import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/NavBar';
import SignUp from './screens/auth/SignUp';
import SignIn from './screens/auth/SignIn';

render(
  <React.StrictMode>
    
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
