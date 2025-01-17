import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function ChungnhanUser() {
    const [tenNguoiNhan, setTenNguoiNhan] = useState('');
    const khoaHoc = 'Thực Tập';
    const ngayHoanThanh = '01/01/2025';

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setTenNguoiNhan(user.fullName || 'Người dùng');
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-3/4 lg:w-1/2">
                <div className="text-center mb-6">
                    {/* Đảm bảo đường dẫn hình ảnh là đúng */}
                    <img
                        alt="Logo tổ chức"
                        className="mx-auto mb-4"
                        src={process.env.PUBLIC_URL + '/assets/2.png'} // Đảm bảo đường dẫn đúng
                        width="100"
                        height="100"
                    />
                    <h1 className="text-3xl font-bold text-gray-800">Giấy Chứng Nhận</h1>
                    <p className="text-lg text-gray-600 mt-2">Chứng nhận rằng</p>
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{tenNguoiNhan}</h2>
                    <p className="text-lg text-gray-600">Đã hoàn thành</p>
                    <h3 className="text-xl font-bold text-gray-800">{khoaHoc}</h3>
                </div>
                <div className="text-center mb-8">
                    <p className="text-lg text-gray-600">Vào ngày</p>
                    <p className="text-lg font-bold text-gray-800">{ngayHoanThanh}</p>
                </div>
                <div className="flex">
                    {/* QR Code nằm bên trái */}
                    <div className="mr-auto">
                        <QRCodeSVG value="https://example.com/certificate" size={120} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChungnhanUser;
