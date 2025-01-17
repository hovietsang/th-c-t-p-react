import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ChiTietNhiemVu() {
    const [taskDetails, setTaskDetails] = useState([]);
    const [newTaskDetail, setNewTaskDetail] = useState({ task_id: '', user_id: '', progress_status: '', score: null });
    const [editTaskDetail, setEditTaskDetail] = useState(null);

    useEffect(() => {
        fetchTaskDetails();
    }, []);

    const fetchTaskDetails = () => {
        axios
            .get('https://api.daksystem.net/hethongchungchithuctap/api/task_details?page=1&limit=3')
            .then((response) => {
                setTaskDetails(response.data);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi lấy danh sách chi tiết nhiệm vụ:', error);
            });
    };

    const handleAddTaskDetail = () => {
        axios
            .post('https://api.daksystem.net/hethongchungchithuctap/api/task_detail', newTaskDetail)
            .then((response) => {
                setTaskDetails([...taskDetails, response.data]);
                setNewTaskDetail({ task_id: '', user_id: '', progress_status: '', score: null });
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi thêm chi tiết nhiệm vụ:', error);
            });
    };

    const handleEditTaskDetail = () => {
        const { task_detail_id } = editTaskDetail;

        axios
            .put(`https://api.daksystem.net/hethongchungchithuctap/api/task_detail/${task_detail_id}`, editTaskDetail)
            .then((response) => {
                const updatedTaskDetails = taskDetails.map((detail) =>
                    detail.task_detail_id === task_detail_id ? response.data : detail
                );
                setTaskDetails(updatedTaskDetails);
                setEditTaskDetail(null);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi sửa chi tiết nhiệm vụ:', error);
            });
    };

    const handleDeleteTaskDetail = (task_detail_id) => {
        axios
            .delete(`https://api.daksystem.net/hethongchungchithuctap/api/task_detail/${task_detail_id}`)
            .then(() => {
                setTaskDetails(taskDetails.filter((detail) => detail.task_detail_id !== task_detail_id));
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi xóa chi tiết nhiệm vụ:', error);
            });
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Quản Lý Chi Tiết Nhiệm Vụ</h1>

            {/* Form Thêm Chi Tiết Nhiệm Vụ */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Thêm Chi Tiết Nhiệm Vụ Mới</h2>
                <input
                    type="text"
                    placeholder="Task ID"
                    value={newTaskDetail.task_id}
                    onChange={(e) => setNewTaskDetail({ ...newTaskDetail, task_id: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={newTaskDetail.user_id}
                    onChange={(e) => setNewTaskDetail({ ...newTaskDetail, user_id: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Progress Status"
                    value={newTaskDetail.progress_status}
                    onChange={(e) => setNewTaskDetail({ ...newTaskDetail, progress_status: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={newTaskDetail.score || ''}
                    onChange={(e) => setNewTaskDetail({ ...newTaskDetail, score: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <button onClick={handleAddTaskDetail} className="bg-blue-500 text-white p-2 rounded mt-2">
                    Thêm Chi Tiết Nhiệm Vụ
                </button>
            </div>

            {/* Danh sách chi tiết nhiệm vụ */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Danh Sách Chi Tiết Nhiệm Vụ</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">ID Nhiệm Vụ</th>
                            <th className="border border-gray-300 p-2">ID Người Dùng</th>
                            <th className="border border-gray-300 p-2">Progress Status</th>
                            <th className="border border-gray-300 p-2">Score</th>
                            <th className="border border-gray-300 p-2 text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskDetails.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-gray-500 text-center border border-gray-300 p-2">Không có chi tiết nhiệm vụ nào.</td>
                            </tr>
                        ) : (
                            taskDetails.map((detail) => (
                                <tr key={detail.task_detail_id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{detail.task_detail_id}</td>
                                    <td className="border border-gray-300 p-2">{detail.task_id}</td>
                                    <td className="border border-gray-300 p-2">{detail.user_id}</td>
                                    <td className="border border-gray-300 p-2">{detail.progress_status}</td>
                                    <td className="border border-gray-300 p-2">{detail.score}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
                                                onClick={() => setEditTaskDetail(detail)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                                <span>Sửa</span>
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600"
                                                onClick={() => handleDeleteTaskDetail(detail.task_detail_id)}>
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

            {/* Form Sửa Chi Tiết Nhiệm Vụ */}
            {editTaskDetail && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sửa Chi Tiết Nhiệm Vụ</h2>
                    <input
                        type="text"
                        value={editTaskDetail.task_id}
                        onChange={(e) => setEditTaskDetail({ ...editTaskDetail, task_id: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={editTaskDetail.user_id}
                        onChange={(e) => setEditTaskDetail({ ...editTaskDetail, user_id: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={editTaskDetail.progress_status}
                        onChange={(e) => setEditTaskDetail({ ...editTaskDetail, progress_status: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="number"
                        value={editTaskDetail.score || ''}
                        onChange={(e) => setEditTaskDetail({ ...editTaskDetail, score: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <button onClick={handleEditTaskDetail} className="bg-blue-500 text-white p-2 rounded mt-2">
                        Lưu Sửa
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChiTietNhiemVu;