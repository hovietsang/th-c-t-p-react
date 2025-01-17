import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const DiemUser = () => {
  const assignments = [
    { title: "Tìm hiểu về React", score: "8/10" },
    { title: "Tìm hiểu về React", score: "8/10" },
    { title: "Tìm hiểu về React", score: "8/10" },
    { title: "Tìm hiểu về React", score: "8/10" },
    { title: "Tìm hiểu về React", score: "8/10" },

  ];

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg h-full">
        <div className="border-b p-4">
          <h2 className="text-2xl font-bold text-blue-800">Điểm</h2>
        </div>
        <div className="divide-y">
          {assignments.map((assignment, index) => (
            <div key={index} className="p-4 flex justify-between items-center">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-4" />
                <h3 className="text-xl font-semibold text-blue-600">{assignment.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-600">Điểm: <span className="font-medium">{assignment.score}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiemUser;