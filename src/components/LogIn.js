/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setType } from './utils/TypeSlice'
import { setUser } from './utils/UserSlice';

const LogIn = () => {

  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();
  const [errorMessage,seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleClick = async() =>{

    try {
        const response =  await fetch(`http://localhost:5000/api/check-patient-password?type=${"GET"}&value=${email.current.value}&password=${password.current.value}`);
        const data = await response.json()
        // console.log(data)
        if (data.passwordMatch === undefined) {
            // Error handling: Unable to check password
            seterrorMessage('Email not found')
        } else if (data.passwordMatch) {
            // Password matches, return the user data
            dispatch(setType({ type: "patient" }));
            dispatch(setUser({uid:data.patient.aadhar,email:data.patient.email,userName:data.patient.name}))
            toast.success('SignIn successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {navigate('/')}
            });
            return data.patient;
        } else {
            // Password is incorrect
            seterrorMessage('wrong password');
        }
  
        // dispatch(setUser({email:email.current.value,userName:userName.current.value}))        
      } catch (error) {
        console.error('Error adding patient:', error);
        seterrorMessage(error.message || 'An error occurred. Please try again.');
      }
    
            
    
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <ToastContainer />
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="mt-12 flex flex-col items-center">
                    <div className="w-full flex-1 my-auto">
                        <div className='text-3xl font-semibold mb-16 text-center font-sans underline underline-offset-2 text-slate-600'>Sign In as Patient</div>
                        <div className="mx-auto max-w-xs">
                            <input ref={email}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email" placeholder="Email" />
                            <input ref={password}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="password" placeholder="Password" />
                            <button onClick={handleClick}
                                className="mt-5 tracking-wide font-semibold bg-blue-300 text-white-500 w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-">
                                    Sign In
                                </span>
                            </button>
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by Cartesian Kinetics
                                <Link href="#" className="border-b border-gray-500 border-dotted">
                                    Terms of Service
                                </Link>
                                and its
                                <Link href="#" className="border-b border-gray-500 border-dotted">
                                    Privacy Policy
                                </Link>
                            </p>
                            <p className="mt-6 text-s text-gray-600 text-center">Already has an account?<Link className="font-medium text-blue-600 underline dark:text-blue-500"  to={'/signup'}>Sign Up</Link></p>
                            {errorMessage && <p className="text-md font-semibold text-red-600 text-center">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-blue-200 border-solid border-4 rounded-lg flex-1 bg-red-700 text-center hidden lg:flex">
                <img src='https://hospitalmanagementsystem.org/images/hospital-information-system.jpg' alt='pic' className='' />
            </div>
        </div>
    </div>
  )
}

export default LogIn