import './App.css';
import { Login } from './components/loginpage/Login';
import { Landing } from './components/landing/Landing.jsx';
import { NotFound } from './components/notFound/NotFound.jsx';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { MainPage } from './components/mainPage/MainPage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from './reducers/modalSlice.js';
import { setUser } from './reducers/userSlice.js';
import ModalWindow from './components/modal/ModalWindow.jsx';
import { DeviceProvider } from './deviceProvider.js';
import { getTokenFromUser, getUsersFromCookies } from './utils/getUserFromCookies.js';





function App() {

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen); // получаем состояние модалки
  const modalData = useSelector((state) => state.modal.modalData); //данные для модалки
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const currentUser = getUsersFromCookies();
    if (currentUser) {
      dispatch(setUser(currentUser));
    }
  }, [dispatch]);
 


  /**DeviceProvider позволит нам использовать useDevice во всех вложенных компонентах. Так
   *  мы будем получать везде чере контекст размеры екрана. 
   */
  return (
    <DeviceProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={user ? <MainPage /> : <Navigate to='/login' />} />
            <Route path='/landing' element={user ? <Landing /> : <Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
        {isModalOpen && <ModalWindow modalData={modalData} />}

      </div>
    </DeviceProvider>

  );
}

export default App;



/** 
 */