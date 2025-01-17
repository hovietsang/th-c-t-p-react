import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import SidebarUser from './pages/user/SidebarUser';
import SidebarAdmin from './pages/admin/SidebarAd';

// Import các trang Admin
import NguoiDung from './pages/admin/nguoidung';
import NhiemVu from './pages/admin/nhiemvu';
import ChiTietNhiemVu from './pages/admin/chitietnv';
import DiemChuyenCan from './pages/admin/diem';
import ChungNhan from './pages/admin/chungnhan';

// Import các trang User
import ChungnhanUser from './pages/user/ChungnhanUser';
import DiemUser from './pages/user/DiemUser';
import NhiemvuUser from './pages/user/NhiemvuUser';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserType(user.userType);
    }
  }, []);

  return (
    <Router>
      <div className="App min-h-screen">
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
        <div className="flex">
          {isLoggedIn && (userType === 'admin' ? <SidebarAdmin /> : <SidebarUser />)}
          <main className="flex-grow h-screen">
            <Routes>
              {/* Đăng nhập cho user */}
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    userType === 'admin' ? (
                      <Navigate to="/admin/nguoidung" />
                    ) : (
                      <Navigate to="/user/nhiemvu" />
                    )
                  ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />
                  )
                }
              />

              {/* Đăng nhập cho admin */}
              <Route
                path="/admin"
                element={
                  isLoggedIn ? (
                    <Navigate to="/admin/nguoidung" />
                  ) : (
                    <Login setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} isAdmin={true} />
                  )
                }
              />

              {/* Trang đăng ký */}
              <Route path="/register" element={<Register />} />

              {/* Routes cho người dùng */}
              <Route
                path="/user/nhiemvu"
                element={isLoggedIn && userType === 'user' ? <NhiemvuUser /> : <Navigate to="/" />}
              />
              <Route
                path="/user/diem"
                element={isLoggedIn && userType === 'user' ? <DiemUser /> : <Navigate to="/" />}
              />
              <Route
                path="/user/chungnhan"
                element={isLoggedIn && userType === 'user' ? <ChungnhanUser /> : <Navigate to="/" />}
              />

              {/* Routes cho admin */}
              <Route
                path="/admin/nguoidung"
                element={isLoggedIn && userType === 'admin' ? <NguoiDung /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/nhiemvu"
                element={isLoggedIn && userType === 'admin' ? <NhiemVu /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/nhiemvu/chi-tiet"
                element={isLoggedIn && userType === 'admin' ? <ChiTietNhiemVu /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/diemchuyencan"
                element={isLoggedIn && userType === 'admin' ? <DiemChuyenCan /> : <Navigate to="/" />}
              />
              <Route
                path="/admin/chungnhan"
                element={isLoggedIn && userType === 'admin' ? <ChungNhan /> : <Navigate to="/" />}
              />
            </Routes>
          </main>
        </div>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;