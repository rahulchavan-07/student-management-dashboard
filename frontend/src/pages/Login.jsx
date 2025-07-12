import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setUsername('');
        setPassword('');
        setError('');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/login`, { username, password })
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard")
                alert('Login Successful')
            } else {
                setError("invalid credential")
                alert("Invalid username or password");
            }
        } catch (error) {
            setError("invalid username or password")
            alert("Invalid username or password");
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-4 bg-gray-900 text-white'>
            <div className='bg-gray-800 p-6 sm:p-8 rounded shadow-lg w-full max-w-sm'>
                <h2 className='text-2xl mb-4 text-center'>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Username"
                        type="text"
                        className='w-full p-2 mb-3 bg-gray-700 text-white rounded'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        className='w-full p-2 mb-3 bg-gray-700 text-white rounded'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='w-full p-2 bg-blue-500 rounded hover:bg-blue-600 transition'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
