import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Diem() {
    const [attendances, setAttendances] = useState([]);
    const [newAttendance, setNewAttendance] = useState({ user_id: '', attendance_date: '', status: '' });
    const [editAttendance, setEditAttendance] = useState(null);

    // Lấy danh sách điểm chuyên cần
    useEffect(() => {
        fetchAttendances();
    }, []);

    const fetchAttendances = () => {
        axios
            .get('https://api.daksystem.net/hethongchungchithuctap/api/attendance?page=1&limit=3')
            .then((response) => {
                setAttendances(response.data);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi lấy danh sách điểm chuyên cần:', error);
            });
    };

    const handleAddAttendance = () => {
        const { user_id, attendance_date, status } = newAttendance;

        if (!user_id || !attendance_date || !status) {
            console.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        axios
            .post('https://api.daksystem.net/hethongchungchithuctap/api/attendance', {
                user_id,
                attendance_date,
                status,
            })
            .then((response) => {
                setAttendances([...attendances, response.data]);
                setNewAttendance({ user_id: '', attendance_date: '', status: '' });
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi thêm điểm chuyên cần:', error.response ? error.response.data : error.message);
            });
    };

    const handleEditAttendance = () => {
        const { attendance_id } = editAttendance;

        axios
            .put(`https://api.daksystem.net/hethongchungchithuctap/api/attendance/${attendance_id}`, editAttendance)
            .then((response) => {
                const updatedAttendances = attendances.map((attendance) =>
                    attendance.attendance_id === attendance_id ? response.data : attendance
                );
                setAttendances(updatedAttendances);
                setEditAttendance(null);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi sửa điểm chuyên cần:', error);
            });
    };

    const handleDeleteAttendance = (attendance_id) => {
        axios
            .delete(`https://api.daksystem.net/hethongchungchithuctap/api/attendance/${attendance_id}`)
            .then(() => {
                setAttendances(attendances.filter((attendance) => attendance.attendance_id !== attendance_id));
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi xóa điểm chuyên cần:', error);
            });
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Quản Lý Điểm Chuyên Cần</h1>

            {/* Form Thêm điểm chuyên cần mới */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Thêm Điểm Chuyên Cần Mới</h2>
                <input
                    type="number"
                    placeholder="ID Người Dùng"
                    value={newAttendance.user_id}
                    onChange={(e) => setNewAttendance({ ...newAttendance, user_id: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="date"
                    value={newAttendance.attendance_date}
                    onChange={(e) => setNewAttendance({ ...newAttendance, attendance_date: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <select
                    value={newAttendance.status}
                    onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                >
                    <option value="">Chọn Trạng Thái</option>
                    <option value="Có mặt">Có mặt</option>
                    <option value="Vắng mặt">Vắng mặt</option>
                </select>
                <button onClick={handleAddAttendance} className="bg-blue-500 text-white p-2 rounded mt-2">
                    Thêm Điểm Chuyên Cần
                </button>
            </div>

            {/* Danh sách điểm chuyên cần */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Danh Sách Điểm Chuyên Cần</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Người Dùng</th>
                            <th className="border border-gray-300 p-2">Ngày Ghi Nhận</th>
                            <th className="border border-gray-300 p-2">Trạng Thái</th>
                            <th className="border border-gray-300 p-2 text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-gray-500 text-center border border-gray-300 p-2">Không có điểm chuyên cần nào.</td>
                            </tr>
                        ) : (
                            attendances.map((attendance) => (
                                <tr key={attendance.attendance_id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{attendance.attendance_id}</td>
                                    <td className="border border-gray-300 p-2">{attendance.user_id}</td>
                                    <td className="border border-gray-300 p-2">{attendance.attendance_date}</td>
                                    <td className="border border-gray-300 p-2">{attendance.status}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
                                                onClick={() => setEditAttendance(attendance)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                                <span>Sửa</span>
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600"
                                                onClick={() => handleDeleteAttendance(attendance.attendance_id)}>
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

            {/* Form Sửa thông tin điểm chuyên cần */}
            {editAttendance && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sửa Thông Tin Điểm Chuyên Cần</h2>
                    <input
                        type="number"
                        value={editAttendance.user_id}
                        onChange={(e) => setEditAttendance({ ...editAttendance, user_id: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="date"
                        value={editAttendance.attendance_date}
                        onChange={(e) => setEditAttendance({ ...editAttendance, attendance_date: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <select
                        value={editAttendance.status}
                        onChange={(e) => setEditAttendance({ ...editAttendance, status: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    >
                        <option value="Có mặt">Có mặt</option>
                        <option value="Vắng mặt">Vắng mặt</option>
                    </select>
                    <button onClick={handleEditAttendance} className="bg-blue-500 text-white p-2 rounded mt-2">
                        Lưu Sửa
                    </button>
                </div>
            )}
        </div>
    );
}

export default Diem;