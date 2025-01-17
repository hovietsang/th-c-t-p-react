// src/components/SidebarUser.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faStar, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const SidebarUser = () => {
    return (
        <div className="w-1/6.5 bg-white h-screen p-4 flex flex-col items-center shadow-md">
            <NavLink
                to="/user/nhiemvu"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faClipboardList} className="text-3xl" />
                <p>Nhiệm Vụ</p>
            </NavLink>
            <NavLink
                to="/user/diem"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faStar} className="text-3xl" />
                <p>Điểm</p>
            </NavLink>
            <NavLink
                to="/user/chungnhan"
                className={({ isActive }) => `mb-8 flex flex-col items-center text-lg p-4 rounded-lg ${isActive ? 'bg-gray-300 text-gray-800' : 'text-gray-600'} hover:bg-gray-200`}
            >
                <FontAwesomeIcon icon={faCertificate} className="text-3xl" />
                <p>Chứng Nhận</p>
            </NavLink>
        </div>
    );
};

export default SidebarUser;