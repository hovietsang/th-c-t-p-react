import React from 'react';

function NhiemvuUser() {
    const tasks = [
        {
            title: 'Tìm hiểu về React',
            dueDate: '1 1 2024',
            score: '-/10 các điểm thành phần',
            status: 'Chưa Được Chấm Điểm',
        },
        {
            title: 'Tìm hiểu về React',
            dueDate: '1 1 2024',
            score: '-/10 các điểm thành phần',
            status: 'Chưa Được Chấm Điểm',
        },
        {
            title: 'Tìm hiểu về React',
            dueDate: '1 1 2024',
            score: '-/10 các điểm thành phần',
            status: 'Chưa Được Chấm Điểm',
        },
        {
            title: 'Tìm hiểu về React',
            dueDate: '1 1 2024',
            score: '-/10 các điểm thành phần',
            status: 'Chưa Được Chấm Điểm',
        },
        {
            title: 'Tìm hiểu về React',
            dueDate: '1 1 2024',
            score: '-/10 các điểm thành phần',
            status: 'Chưa Được Chấm Điểm',
        },
        {
            title: 'Tìm hiểu về React',
            dueDate: '1 1 2024',
            score: '-/10 các điểm thành phần',
            status: 'Chưa Được Chấm Điểm',
        },
    ];

    return (
        <div className="h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg h-full">
                <div className="border-b p-4">
                    <h2 className="text-2xl font-bold text-blue-800">Nhiệm vụ</h2>
                </div>
                <div className="divide-y">
                    {tasks.map((task, index) => (
                        <div key={index} className="p-4 flex items-start">
                            <i className="fas fa-file-alt text-gray-500 mr-4"></i>
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">{task.title}</h3>
                                <p className="text-sm text-gray-600">
                                    Đến hạn <span className="font-medium">{task.dueDate}</span> | <span className="font-medium">{task.score}</span> | <span className="font-medium">{task.status}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NhiemvuUser;