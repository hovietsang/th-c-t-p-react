import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

    const handleLogout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('user');

        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(false);

        // Điều hướng về trang đăng nhập
        navigate('/');
    };

    // Xác định đường dẫn dựa trên loại tài khoản
    const handleLogoClick = () => {
        if (user && user.userType === 'admin') {
            navigate('/admin'); // Điều hướng đến trang admin
        } else {
            navigate('/user'); // Điều hướng đến trang user
        }
    };

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-pink-500 border-b border-gray-200"> {/* Áp dụng gradient màu nền */}
            <div className="container mx-auto px-4 flex items-center justify-between py-4">
                <div className="flex items-center">
                    <img
                        alt="Logo"
                        className="h-16 cursor-pointer"
                        src="assets/2.png"
                        onClick={handleLogoClick} // Thêm sự kiện click cho logo
                    />
                    <span
                        className="ml-2 text-white font-bold text-lg hidden sm:inline cursor-pointer" // Đổi màu chữ thành trắng
                        onClick={handleLogoClick} // Thêm sự kiện click cho chữ
                    >
                        CÔNG TY TNHH DAKSYSTEM
                    </span>
                </div>
                <div className="flex items-center space-x-4 flex-grow justify-center">
                    <div className="flex items-center w-full max-w-3xl">
                        <input
                            className="border border-gray-300 rounded-full px-6 py-3 w-full text-sm"
                            placeholder="Bạn muốn tìm gì?"
                            type="text"
                        />
                        <button className="ml-2 bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition duration-300 w-12 h-12 flex items-center justify-center">
                            <i className="fas fa-search text-white text-lg"></i>
                        </button>
                    </div>

                    {/* Hiển thị tên người dùng với chữ "Xin chào" */}
                    {user && (
                        <div className="text-white font-semibold">
                            Xin chào, {user.fullName} {/* Hiển thị tên người dùng */}
                        </div>
                    )}

                    <div className="relative">
                        <button
                            className="bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 transition duration-300"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="container mx-auto px-4">
                <div className="flex flex-wrap space-x-4 sm:space-x-8 py-4">
                    <Link className="text-blue-600 border-b-2 border-blue-600 pb-2" to="/">
                        Home
                    </Link>
                    <Link className="text-gray-600" to="/my-learning">
                        My Learning
                    </Link>
                    <Link className="text-gray-600" to="/online-degrees">
                        Online Degrees
                    </Link>
                    <Link className="text-gray-600" to="/careers">
                        Careers
                    </Link>
                </div>
            </div> */}
        </nav>
    );
};

export default Header;
