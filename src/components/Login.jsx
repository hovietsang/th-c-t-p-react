import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUserType, isAdmin = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, [navigate, setIsLoggedIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const url = isAdmin
                ? 'http://localhost:5000/admins'
                : 'http://localhost:5000/users';
            const response = await fetch(url);
            const data = await response.json();

            const loggedInUser = data.find(
                user => user.email === email && user.password === password
            );

            if (loggedInUser) {
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                setIsLoggedIn(true);
                setUserType(isAdmin ? 'admin' : 'user');
                navigate(isAdmin ? '/admin/nhiemvu' : '/user/nhiemvu');
            } else {
                setError('Email hoặc mật khẩu không chính xác');
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi kết nối tới máy chủ');
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center w-full max-w-md">
                <div className="mb-6 md:mb-0 md:mr-8 flex flex-col items-center">
                    <img
                        alt="User avatar illustration"
                        className="rounded-full shadow-lg w-24 h-24 object-cover"
                        src='/assets/1.png'
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-4">Đăng Nhập</h2>
                    {/* Ensure the error container does not change the form size */}
                    <div className={`${error ? 'block' : 'hidden'} mb-4`}>
                        <p className="text-red-500">{error}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="flex items-center bg-gray-100 rounded-lg p-2">
                                <i className="fas fa-envelope text-gray-500 mr-2"></i>
                                <input
                                    className="bg-gray-100 outline-none flex-1"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center bg-gray-100 rounded-lg p-2">
                                <i className="fas fa-lock text-gray-500 mr-2"></i>
                                <input
                                    className="bg-gray-100 outline-none flex-1"
                                    placeholder="Mật Khẩu"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <button
                                className="w-full bg-green-500 text-white rounded-lg py-2"
                                type="submit"
                            >
                                Đăng Nhập
                            </button>
                        </div>
                        {!isAdmin && (
                            <div className="text-center">
                                <Link className="text-blue-500" to="/register">
                                    Chưa có tài khoản? Đăng ký
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
