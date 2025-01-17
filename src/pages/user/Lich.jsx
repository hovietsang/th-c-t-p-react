import React from 'react';

const Lich = () => {
    const getCurrentWeekDates = () => {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay() + 1; // Bắt đầu từ thứ 2
        const startDate = new Date(today.setDate(firstDayOfWeek)); // Ngày đầu tuần
        const endDate = new Date(today.setDate(firstDayOfWeek + 6)); // Ngày cuối tuần

        return {
            start: startDate,
            end: endDate,
        };
    };

    const { start } = getCurrentWeekDates();
    const nextWeekStart = new Date(start);
    nextWeekStart.setDate(start.getDate() + 7);

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('vi-VN', options);
    };

    const currentWeekRange = `Từ ngày ${formatDate(start)} đến ngày ${formatDate(new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000))}`;
    const nextWeekRange = `Từ ngày ${formatDate(nextWeekStart)} đến ngày ${formatDate(new Date(nextWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000))}`;

    const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']; // Thứ 5 đã thay thành '5'

    return (
        <div className="container mx-auto w-4/5 text-center">
            <div className="flex justify-between items-center p-2">
                <div className="text-lg">
                </div>
                <div className="text-lg text-red-500 flex-grow text-right mx-2">
                    {currentWeekRange}
                </div>
            </div>

            <table className="w-full border-collapse mt-2">
                <thead>
                    <tr>
                        <th rowSpan="2" className="relative bg-blue-900 text-white">
                            <div className="diagonal-label">Buổi</div>
                        </th>
                    </tr>
                    <tr>
                        {weekDays.map((day, index) => (
                            <th key={index} className="bg-blue-900 text-white text-center">
                                {day} <br />
                                {formatDate(new Date(start.getTime() + index * 24 * 60 * 60 * 1000))}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {['Sáng', 'Chiều', 'Tối'].map((period, index) => (
                        <tr key={index}>
                            <td className="bg-cyan-100">{period}</td>
                            {Array.from({ length: 7 }, (_, subIndex) => (
                                <td key={subIndex} className="border border-gray-300 bg-white"></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end items-center p-2">
                <div className="text-lg text-red-500 flex-grow text-right mx-2">
                    {nextWeekRange}
                </div>
            </div>

            <table className="w-full border-collapse mt-2">
                <thead>
                    <tr>
                        <th rowSpan="2" className="relative bg-blue-900 text-white">
                            <div className="diagonal-label">Buổi</div>
                        </th>
                    </tr>
                    <tr>
                        {weekDays.map((day, index) => (
                            <th key={index} className="bg-blue-900 text-white text-center">
                                {day} <br />
                                {formatDate(new Date(nextWeekStart.getTime() + index * 24 * 60 * 60 * 1000))}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {['Sáng', 'Chiều', 'Tối'].map((period, index) => (
                        <tr key={index}>
                            <td className="bg-cyan-100">{period}</td>
                            {Array.from({ length: 7 }, (_, subIndex) => (
                                <td key={subIndex} className="border border-gray-300 bg-white"></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Lich;
