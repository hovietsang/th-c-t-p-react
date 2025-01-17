import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function NhiemVu() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ task_name: '', description: '', assigned_date: '', due_date: '' });
    const [editTask, setEditTask] = useState(null);

    // Lấy danh sách nhiệm vụ
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios
            .get('https://api.daksystem.net/hethongchungchithuctap/api/tasks?page=1&limit=3')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi lấy danh sách nhiệm vụ:', error);
            });
    };

    // Thêm nhiệm vụ mới
    const handleAddTask = () => {
        const { task_name, description, assigned_date, due_date } = newTask;

        if (!task_name || !description || !due_date) {
            console.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        axios
            .post('https://api.daksystem.net/hethongchungchithuctap/api/task', {
                task_name,
                description,
                assigned_date,
                due_date,
            })
            .then((response) => {
                setTasks([...tasks, response.data]);
                setNewTask({ task_name: '', description: '', assigned_date: '', due_date: '' });
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi thêm nhiệm vụ:', error.response ? error.response.data : error.message);
            });
    };

    // Xóa nhiệm vụ
    const handleDeleteTask = (task_id) => {
        axios
            .delete(`https://api.daksystem.net/hethongchungchithuctap/api/task/${task_id}`)
            .then(() => {
                setTasks(tasks.filter((task) => task.task_id !== task_id));
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi xóa nhiệm vụ:', error.response ? error.response.data : error.message);
            });
    };

    // Sửa thông tin nhiệm vụ
    const handleEditTask = () => {
        const { task_name, description, assigned_date, due_date, task_id } = editTask;

        if (!task_name || !description || !due_date) {
            console.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        axios
            .put(`https://api.daksystem.net/hethongchungchithuctap/api/task/${task_id}`, {
                task_name,
                description,
                assigned_date,
                due_date,
            })
            .then((response) => {
                const updatedTasks = tasks.map((task) => (task.task_id === task_id ? response.data : task));
                setTasks(updatedTasks);
                setEditTask(null);
            })
            .catch((error) => {
                console.error('Có lỗi xảy ra khi sửa nhiệm vụ:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Quản Lý Nhiệm Vụ</h1>

            {/* Form Thêm nhiệm vụ mới */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Thêm Nhiệm Vụ Mới</h2>
                <input
                    type="text"
                    placeholder="Tên Nhiệm Vụ"
                    value={newTask.task_name}
                    onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Mô Tả"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="date"
                    value={newTask.assigned_date}
                    onChange={(e) => setNewTask({ ...newTask, assigned_date: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                    className="border p-2 m-2 w-full max-w-xs"
                />
                <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded mt-2">
                    Thêm Nhiệm Vụ
                </button>
            </div>

            {/* Danh sách nhiệm vụ */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Danh Sách Nhiệm Vụ</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Tên Nhiệm Vụ</th>
                            <th className="border border-gray-300 p-2">Mô Tả</th>
                            <th className="border border-gray-300 p-2">Ngày Giao</th>
                            <th className="border border-gray-300 p-2">Ngày Hết Hạn</th>
                            <th className="border border-gray-300 p-2">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-gray-500 text-center border border-gray-300 p-2">Không có nhiệm vụ nào.</td>
                            </tr>
                        ) : (
                            tasks.map((task) => (
                                <tr key={task.task_id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">{task.task_id}</td>
                                    <td className="border border-gray-300 p-2">{task.task_name}</td>
                                    <td className="border border-gray-300 p-2">{task.description}</td>
                                    <td className="border border-gray-300 p-2">{task.assigned_date || 'Chưa giao'}</td>
                                    <td className="border border-gray-300 p-2">{task.due_date}</td>
                                    <td className="border border-gray-300 p-2">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => setEditTask(task)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                                <span>Sửa</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.task_id)}
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

            {/* Form Sửa thông tin nhiệm vụ */}
            {editTask && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sửa Thông Tin Nhiệm Vụ</h2>
                    <input
                        type="text"
                        value={editTask.task_name}
                        onChange={(e) => setEditTask({ ...editTask, task_name: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="text"
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="date"
                        value={editTask.assigned_date}
                        onChange={(e) => setEditTask({ ...editTask, assigned_date: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <input
                        type="date"
                        value={editTask.due_date}
                        onChange={(e) => setEditTask({ ...editTask, due_date: e.target.value })}
                        className="border p-2 m-2 w-full max-w-xs"
                    />
                    <button onClick={handleEditTask} className="bg-blue-500 text-white p-2 rounded mt-2">
                        Lưu Sửa
                    </button>
                </div>
            )}
        </div>
    );
}

export default NhiemVu;