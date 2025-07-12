import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Manage = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/students`);
            setStudents(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/students/${id}`);
            console.log("Response from server:", res.data);
            fetchStudent();
        } catch (err) {
            console.error(err);
        }
    };

    const filterData = students
        .filter((student) => student.name && student.class && student.batchYear)
        .filter((student) => {
            const name = student.name || "";
            const studentClass = student.class || "";
            const batchYear = student.batchYear ? student.batchYear.toString() : "";

            return (
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
                batchYear.includes(searchTerm)
            );
        });

    return (
        <div className='flex flex-col md:flex-row bg-gray-900 text-white min-h-screen'>
            <Sidebar />
            <div className='flex-1 p-4 md:ml-64 mt-16 md:mt-0'>
                <h2 className='text-xl font-semibold mb-4'>Manage Students</h2>

                <input
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search by name or class or batch year"
                    className="w-full p-2 mb-4 bg-gray-800 text-white placeholder-gray-400 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />

                <div className="overflow-x-auto rounded border border-gray-700">
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='text-left bg-gray-800 border-b border-gray-700'>
                                <th className='p-2'>Name</th>
                                <th className='p-2'>Class</th>
                                <th className='p-2'>Batch</th>
                                <th className='p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.length > 0 ? (
                                filterData.map((student) => (
                                    <tr key={student._id} className='border-b border-gray-800 hover:bg-gray-700 transition-colors'>
                                        <td className='p-2'>{student.name}</td>
                                        <td className='p-2'>{student.class}</td>
                                        <td className='p-2'>{student.batchYear}</td>
                                        <td className='p-2'>
                                            <div className="flex gap-3">
                                                <FaEdit
                                                    onClick={() => navigate(`/add?id=${student._id}`)}
                                                    className='text-yellow-400 hover:cursor-pointer'
                                                />
                                                <FaTrash
                                                    onClick={() => deleteStudent(student._id)}
                                                    className='text-red-500 hover:cursor-pointer'
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className='p-2' colSpan="4">No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Manage;
