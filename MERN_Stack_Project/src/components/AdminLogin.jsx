import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import getBaseURL from '../utils/getBaseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {


    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();


    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${getBaseURL()}/api/auth/admin`, data, {
                userName: data.userName,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application.json',
                }
            })
            const auth = response.data;
            //console.log(auth);
            if (auth.token){
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert("Session expired. Please login again.");
                    navigate("/");
                }, 3600*1800)
            }
            alert("Admin Login successful!");
            navigate("/dashboard");
        }
            catch (error) {
            setMessage("Please provide a valid username and password.");
            console.error(error);
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-4' htmlFor='userName'>
                            Username
                        </label>
                        <input  {...register("userName", { required: true })} type='text' name='userName' id='userName' placeholder='userName'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-4' htmlFor='password'>
                            Password
                        </label>
                        <input  {...register("password", { required: true })} type='password' name='password' id='password' placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'></input>
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-4'>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-8 rounded focus:outline-none'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin