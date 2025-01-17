import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ChungNhan() {
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    user_id: '',
    average_task_score: '',
    attendance_score: '',
    final_score: '',
    issued_date: ''
  });
  const [editCertificate, setEditCertificate] = useState(null);

  // Lấy danh sách chứng chỉ
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = () => {
    axios
      .get('https://api.daksystem.net/hethongchungchithuctap/api/certificates?page=1&limit=3')
      .then((response) => {
        setCertificates(response.data);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra khi lấy danh sách chứng chỉ:', error);
      });
  };

  // Thêm chứng chỉ mới
  const handleAddCertificate = () => {
    axios
      .post('https://api.daksystem.net/hethongchungchithuctap/api/certificate', newCertificate)
      .then((response) => {
        setCertificates([...certificates, response.data]);
        setNewCertificate({
          user_id: '',
          average_task_score: '',
          attendance_score: '',
          final_score: '',
          issued_date: ''
        });
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra khi thêm chứng chỉ:', error);
      });
  };

  // Xóa chứng chỉ
  const handleDeleteCertificate = (certificate_id) => {
    axios
      .delete(`https://api.daksystem.net/hethongchungchithuctap/api/certificate/${certificate_id}`)
      .then(() => {
        setCertificates(certificates.filter((cert) => cert.certificate_id !== certificate_id));
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra khi xóa chứng chỉ:', error);
      });
  };

  // Sửa chứng chỉ
  const handleEditCertificate = () => {
    axios
      .put(`https://api.daksystem.net/hethongchungchithuctap/api/certificate/${editCertificate.certificate_id}`, editCertificate)
      .then((response) => {
        setCertificates(certificates.map((cert) => (cert.certificate_id === editCertificate.certificate_id ? response.data : cert)));
        setEditCertificate(null);
      })
      .catch((error) => {
        console.error('Có lỗi xảy ra khi sửa chứng chỉ:', error);
      });
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Chứng Nhận</h1>

      {/* Form Thêm Chứng Nhận Mới */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Thêm Chứng Nhận Mới</h2>
        <input
          type="text"
          placeholder="User ID"
          value={newCertificate.user_id}
          onChange={(e) => setNewCertificate({ ...newCertificate, user_id: e.target.value })}
          className="border p-2 m-2 w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Điểm trung bình nhiệm vụ"
          value={newCertificate.average_task_score}
          onChange={(e) => setNewCertificate({ ...newCertificate, average_task_score: e.target.value })}
          className="border p-2 m-2 w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Điểm tham gia"
          value={newCertificate.attendance_score}
          onChange={(e) => setNewCertificate({ ...newCertificate, attendance_score: e.target.value })}
          className="border p-2 m-2 w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Điểm cuối"
          value={newCertificate.final_score}
          onChange={(e) => setNewCertificate({ ...newCertificate, final_score: e.target.value })}
          className="border p-2 m-2 w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Ngày cấp"
          value={newCertificate.issued_date}
          onChange={(e) => setNewCertificate({ ...newCertificate, issued_date: e.target.value })}
          className="border p-2 m-2 w-full max-w-xs"
        />
        <button onClick={handleAddCertificate} className="bg-blue-500 text-white p-2 rounded mt-2">
          Thêm Chứng Nhận
        </button>
      </div>

      {/* Danh sách chứng nhận dưới dạng bảng */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Danh Sách Chứng Nhận</h2>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">User ID</th>
              <th className="border border-gray-300 p-2">Điểm Trung Bình Nhiệm Vụ</th>
              <th className="border border-gray-300 p-2">Điểm Tham Gia</th>
              <th className="border border-gray-300 p-2">Điểm Cuối</th>
              <th className="border border-gray-300 p-2">Ngày Cấp</th>
              <th className="border border-gray-300 p-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-gray-500 text-center border border-gray-300 p-2">Không có chứng nhận nào.</td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr key={cert.certificate_id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{cert.certificate_id}</td>
                  <td className="border border-gray-300 p-2">{cert.user_id}</td>
                  <td className="border border-gray-300 p-2">{cert.average_task_score}</td>
                  <td className="border border-gray-300 p-2">{cert.attendance_score}</td>
                  <td className="border border-gray-300 p-2">{cert.final_score}</td>
                  <td className="border border-gray-300 p-2">{cert.issued_date}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => setEditCertificate(cert)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCertificate(cert.certificate_id)}
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

      {/* Form Sửa Chứng Nhận */}
      {editCertificate && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sửa Chứng Nhận</h2>
          <input
            type="text"
            value={editCertificate.user_id}
            onChange={(e) => setEditCertificate({ ...editCertificate, user_id: e.target.value })}
            className="border p-2 m-2 w-full max-w-xs"
          />
          <input
            type="number"
            value={editCertificate.average_task_score}
            onChange={(e) => setEditCertificate({ ...editCertificate, average_task_score: e.target.value })}
            className="border p-2 m-2 w-full max-w-xs"
          />
          <input
            type="number"
            value={editCertificate.attendance_score}
            onChange={(e) => setEditCertificate({ ...editCertificate, attendance_score: e.target.value })}
            className="border p-2 m-2 w-full max-w-xs"
          />
          <input
            type="number"
            value={editCertificate.final_score}
            onChange={(e) => setEditCertificate({ ...editCertificate, final_score: e.target.value })}
            className="border p-2 m-2 w-full max-w-xs"
          />
          <input
            type="date"
            value={editCertificate.issued_date}
            onChange={(e) => setEditCertificate({ ...editCertificate, issued_date: e.target.value })}
            className="border p-2 m-2 w-full max-w-xs"
          />
          <button onClick={handleEditCertificate} className="bg-blue-500 text-white p-2 rounded mt-2">
            Lưu Sửa
          </button>
        </div>
      )}
    </div>
  );
}

export default ChungNhan;