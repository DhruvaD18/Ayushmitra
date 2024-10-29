import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from './utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { setType } from './utils/TypeSlice'
import { getFirestore, doc, setDoc } from "firebase/firestore";

const HsignUp = () => {

  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);
  const confirmpassword = useRef(null);
  const address = useRef(null);
  const mobile = useRef(null)
  const staffCount = useRef(null)

  const [errorMsg,seterrorMsg] = useState(null)
  const dispatch = useDispatch();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleClick = () =>{
    if(password.current.value !== confirmpassword.current.value){
      seterrorMsg('Confirmation of password is wrong')
      return
    }

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // User created
            const user = userCredential.user;
            setDoc(doc(db, "hospital", user.uid), {
              role: "hospital" // role could be "hospital" or "patient"
            });

            // Update the user profile with the username
            return updateProfile(user, {
                displayName: userName.current.value,
                // aadhar:aadhar.current.value,
            });
        })
        .then(() => {
            // Navigate to the home page after successful profile update
            // console.log(auth.currentUser.displayName)
            dispatch(setType({type:"hospital"}))
            toast.success('SignUp successfully', {
              position: "top-center",
              autoClose: 3000,
              onClose: () => navigate('/'),
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
        })
        .catch((error) => {
            seterrorMsg(error.code, error.message);
        });
  }

  return (
    <div className='min-h-screen w-screen bg-slate-100 relative'>
      <ToastContainer />
      <div className='w-2/3 h-10/12 bg-slate-200 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
        <div className='text-2xl text-center mt-5 font-semibold underline underline-offset-2'>Sign Up</div>
        <form onSubmit={(e)=>e.preventDefault()} className="space-y-4 md:space-y-6 py-6 px-20">
          <div className='flex gap-4 justify-around'>
            <div>
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital name</label>
              <input ref={userName} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your userName" required="" />
            </div>
            <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input ref={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required="" />
            </div>
          </div>
          <div className='flex gap-4 justify-around'>
            <div>
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
              <input ref={password} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your userName" required="" />
            </div>
            <div>
              <label for="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password:</label>
              <input ref={confirmpassword} type="password" name="confirmpassword" id="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required="" />
            </div>
          </div> 
          <div className='px-12'>
            <div>
              <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital Address</label>
              <input ref={address} type="address" name="address" id="address" className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Hospital Address" required="" />
            </div>
          </div>
          <div className='flex gap-4 justify-around'>
            <div>
              <label for="ContactNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Details:</label>
              <input ref={mobile} type="text" name="ContactNumber" id="ContactNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Contact Number" required="" />
            </div>
            <div>
              <label for="staffCount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Staff Available:</label>
              <input ref={staffCount} type="text" name="staffCount" id="staffCount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required="" />
            </div>
          </div>
          <button onClick={handleClick}
            className="mx-auto tracking-wide font-semibold bg-blue-300 text-white-500 w-32 py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
          {errorMsg && <p className='text-red-500 text-xl'>{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default HsignUp
