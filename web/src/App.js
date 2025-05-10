import './App.css';
import Nav from './component/Nav';
import Report from './component/Report';
import MyPage from './component/MyPage';
import Footer from './component/Footer';
import SignIn from './component/SignIn';
import ProtectedRoute from './component/ProtectedRoute';
import ReportDetail from './component/ReportDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Nav isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
            <Routes>
              <Route path='/' element={<SignIn onLogin={() => setIsLoggedIn(true)} />} />

              <Route path='/Report' element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Report />
                  </ProtectedRoute>
              } />

              <Route path='/MyPage' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <MyPage />
                </ProtectedRoute>
              } />

              <Route path='/Report/:id' element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ReportDetail />
                </ProtectedRoute>
              } />
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
