import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType] = useState('user'); // Mặc định là 'user'
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Kiểm tra xem tất cả thông tin đã được nhập đầy đủ chưa
        if (!fullName || !email || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        // Lấy danh sách người dùng hiện có để xác định id lớn nhất
        let maxId = 0;
        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const users = await response.json();
                // Tìm id lớn nhất
                maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách người dùng:', error);
        }

        // Tạo đối tượng người dùng mới với id tự động tăng
        const newUser = {
            id: maxId + 1, // Tăng id lên 1
            fullName,
            email,
            password,
            userType,
        };

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                // Tự động đăng nhập sau khi đăng ký thành công
                const loggedInUser = newUser; // Sử dụng newUser vì đây là thông tin người dùng mới

                // Lưu thông tin đăng nhập vào localStorage
                localStorage.setItem('user', JSON.stringify(loggedInUser));

                // Điều hướng đến trang user
                navigate('/user'); // Trang user
            } else {
                console.error('Đăng ký không thành công');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-8">
                    <img
                        alt="User avatar illustration"
                        className="rounded-full shadow-lg w-16 h-16 object-cover mb-4"
                        src="assets/1.png"
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-4">Đăng Ký</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="flex items-center bg-gray-100 rounded-lg p-2">
                                <i className="fas fa-user text-gray-500 mr-2"></i>
                                <input
                                    className="bg-gray-100 outline-none flex-1"
                                    placeholder="Full Name"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>
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
                                    placeholder="Password"
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
                                Register
                            </button>
                        </div>
                        <div className="text-center">
                            <Link className="text-blue-500" to="/">
                                Bạn đã có tài khoản? Đăng nhập tại đây.
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;