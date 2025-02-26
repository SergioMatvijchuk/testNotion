import './App.css';
import { Login } from './components/loginpage/Login';
import { Landing } from './components/landing/Landing.jsx';
import { Nav } from './components/landing/Nav.jsx';
import { AboutUs } from './components/landing/about_us/AboutUs.jsx';
import { Faq } from './components/landing/faq/Faq.jsx';
import { Contacts } from './components/landing/contacts/Contacts.jsx';
import { NotFound } from './components/notFound/NotFound.jsx';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { MainPage } from './components/mainPage/MainPage.jsx';
import { NewPage } from './components/mainPage/newPage/NewPage.jsx';
import { Board } from './components/mainPage/board/Board.jsx';



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
