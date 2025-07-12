import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const Add = () => {

  const [studentData, setStudentData] = useState({ name: "", class: "", batchYear: "", gender: "" })
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()

  const studentId = searchParams.get("id");

  useEffect(() => {
    if (studentId) {
      fetchStudentData(studentId);
    }
  }, [])

  const fetchStudentData = async (id) => {

    try {
      const res = await axios.get(`http://localhost:5000/api/students/${id}`)
      setStudentData(res.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (studentId) {

        await axios.put(`http://localhost:5000/api/students/${studentId}`, studentData);
      } else {

        await axios.post(`http://localhost:5000/api/student`, studentData);
      }

      navigate("/dashboard");
    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-64 mt-16 md:mt-0">
        <h2 className="text-lg mb-4">{studentId ? "Edit Student" : "Add Students"}</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-xl mx-auto"
        >
          <input
            value={studentData.name}
            onChange={(e) =>
              setStudentData({ ...studentData, name: e.target.value })
            }
            required
            type="text"
            placeholder="Enter Student Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            value={studentData.class}
            onChange={(e) =>
              setStudentData({ ...studentData, class: e.target.value })
            }
            required
            type="text"
            placeholder="Enter Class Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            value={studentData.batchYear}
            onChange={(e) =>
              setStudentData({ ...studentData, batchYear: e.target.value })
            }
            required
            type="text"
            placeholder="Enter Batch Year"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <select
            onChange={(e) =>
              setStudentData({ ...studentData, gender: e.target.value })
            }
            value={studentData.gender}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            type="submit"
            className="hover:cursor-pointer bg-blue-500 p-2 rounded w-full"
          >
            {studentId ? "Update student" : "Add Students"}
          </button>
        </form>
      </div>
    </div>

  )
}

export default Add
