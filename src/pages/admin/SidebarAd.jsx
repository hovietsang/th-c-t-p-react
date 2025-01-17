import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faTasks, faCertificate, faUsers, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const SidebarAdmin = () => {
    return (
        <div className="w-1/6.5 bg-white h-screen p-4 flex flex-col items-center shadow-md">
            <NavLink
                to="/admin/nguoidung"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faUsers} className="text-3xl" />
                <p>Quản Lý Người Dùng</p>
            </NavLink>
            <NavLink
                to="/admin/nhiemvu"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
                end // Sử dụng `end` để chỉ bôi đen khi đúng đường dẫn chính xác
            >
                <FontAwesomeIcon icon={faClipboardList} className="text-3xl" />
                <p>Quản Lý Nhiệm Vụ</p>
            </NavLink>
            <NavLink
                to="/admin/nhiemvu/chi-tiet"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faTasks} className="text-3xl ml-4" />
                <p>Chi Tiết Nhiệm Vụ</p>
            </NavLink>
            <NavLink
                to="/admin/diemchuyencan"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faUserCheck} className="text-3xl" />
                <p>Quản Lý Điểm Chuyên Cần</p>
            </NavLink>
            <NavLink
                to="/admin/chungnhan"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faCertificate} className="text-3xl" />
                <p>Quản Lý Chứng Nhận</p>
            </NavLink>
        </div>
    );
};

export default SidebarAdmin;