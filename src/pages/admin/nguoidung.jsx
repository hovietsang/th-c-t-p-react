import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function NguoiDung() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', full_name: '', email: '', password: '', role: 'student' });
    const [editUser, setEditUser] = useState(null);

    // Lấy danh sách người dùng
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get('https://api.daksystem.net/hethongchungchithuctap/api/users?page=1&limit=3')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi lấy danh sách người dùng:', error);
            });
    };

    // Thêm người dùng mới
    const handleAddUser = () => {
        const { username, password, full_name, email, role } = newUser;

        // Kiểm tra xem tất cả các trường đều có giá trị
        if (!username || !password || !full_name || !email || !role) {
            console.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        axios
            .post('https://api.daksystem.net/hethongchungchithuctap/api/user', {
                username,
                password,
                full_name,
                email,
                role,
            })
            .then((response) => {
                setUsers([...users, response.data]);
                setNewUser({ username: '', full_name: '', email: '', password: '', role: 'student' });
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi thêm người dùng:', error.response ? error.response.data : error.message);
            });
    };

    // Xóa người dùng
    const handleDeleteUser = (user_id) => {
        axios
            .delete(`https://api.daksystem.net/hethongchungchithuctap/api/user/${user_id}`)
            .then(() => {
                setUsers(users.filter((user) => user.user_id !== user_id));
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi xóa người dùng:', error);
            });
    };

    // Sửa thông tin người dùng
    const handleEditUser = () => {
        axios
            .put(`https://api.daksystem.net/hethongchungchithuctap/api/user/${editUser.user_id}`, editUser)
            .then((response) => {
                setUsers(users.map((user) => (user.user_id === editUser.user_id ? response.data : user)));
                setEditUser(null);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi sửa người dùng:', error);
            });
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Quản Lý Người Dùng</h1>

            {/* Form Thêm người dùng mới */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Thêm Người Dùng Mới</h2>
                <input
                    type="text"
                    placeholder="Tên đầy đủ"
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Tên tài khoản (Username)"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Mật khẩu"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                >
                    <option value="student">student</option>
                    <option value="admin">admin</option>
                </select>
                <button onClick={handleAddUser} className="bg-blue-500 text-white p-2 rounded mt-2">
                    Thêm Người Dùng
                </button>
            </div>

            {/* Danh sách người dùng dưới dạng bảng */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Danh Sách Người Dùng</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Tên</th>
                            <th className="border border-gray-300 p-2">Username</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Vai trò</th>
                            <th className="border border-gray-300 p-2">Mật khẩu</th>
                            <th className="border border-gray-300 p-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-gray-500 text-center border border-gray-300 p-2">Không có người dùng nào.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{user.user_id}</td>
                                    <td className="border border-gray-300 p-2">{user.full_name || 'Không có tên'}</td>
                                    <td className="border border-gray-300 p-2">{user.username}</td>
                                    <td className="border border-gray-300 p-2">{user.email}</td>
                                    <td className="border border-gray-300 p-2">{user.role}</td>
                                    <td className="border border-gray-300 p-2">{user.password}</td>
                                    <td className="border border-gray-300 p-2">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => setEditUser(user)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                                <span>Sửa</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.user_id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600"
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                <span>Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form Sửa thông tin người dùng */}
            {editUser && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sửa Thông Tin Người Dùng</h2>
                    <input
                        type="text"
                        value={editUser.full_name}
                        onChange={(e) => setEditUser({ ...editUser, full_name: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={editUser.username}
                        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="email"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={editUser.password}
                        onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <select
                        value={editUser.role}
                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    >
                        <option value="student">student</option>
                        <option value="admin">admin</option>
                    </select>
                    <button onClick={handleEditUser} className="bg-blue-500 text-white p-2 rounded mt-2">
                        Lưu Sửa
                    </button>
                </div>
            )}
        </div>
    );
}

export default NguoiDung;