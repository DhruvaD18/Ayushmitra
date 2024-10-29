import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { app } from './utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setType } from './utils/TypeSlice'
import { getFirestore, doc, setDoc } from "firebase/firestore";

const SignUp = () => {

  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);
  const aadhar = useRef(null);

  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = getFirestore(app);


  const [errorMsg,seterrorMsg] = useState(null)

  const handleClick = () =>{
    // createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    //     .then((userCredential) => {
    //         // User created
    //         const user = userCredential.user;

    //         // Update the user profile with the username
    //         return updateProfile(user, {
    //             displayName: userName.current.value,
    //         }).then(() => {
    //             // After updating the profile, store additional user information in Firestore
    //             const userRef = doc(firestore, "users", user.uid);
    //             return setDoc(userRef, {
    //                 displayName: userName.current.value,
    //                 // aadhar: aadhar.current.value,  // Add Aadhaar number here
    //             });
    //         });
    //     })
    //     .then(() => {
    //         // Navigate to the home page after successful profile update and Firestore entry
    //         // console.log('name',auth.currentUser.displayName)
    //         // console.log('adhar',auth.currentUser.aadhar)
    //         navigate('/');
    //     })
    //     .catch((error) => {
    //         // Handle errors here
    //         seterrorMsg(error.code, error.message);
    //     });



    // console.log(email,password)
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // User created
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
              role: "patient" // role could be "hospital" or "patient"
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
            dispatch(setType({type:"patient"}))
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
      };

  return (
    <section className="flex flex-col items-center pt-6">
      <ToastContainer />
      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an
            account
          </h1>
          <form onSubmit={(e)=>e.preventDefault()} className="space-y-4 md:space-y-6">
            <div>
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
              <input ref={userName} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your userName" required="" />
            </div>
            <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input ref={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" required="" />
            </div>
            <div>
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input ref={password} type="password" name="password" id="password" placeholder="Enter the password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label for="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient's Aadhar Number</label>
              <input ref={aadhar} type="text" name="number" id="number" placeholder="Enter the Aadhar Number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <button onClick={handleClick} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
            <div className="flex flex-col items-center">
                <button
                    className="w-full max-w-xs font-bold shadow-md rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                            <path
                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                fill="#4285f4" />
                            <path
                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                fill="#34a853" />
                            <path
                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                fill="#fbbc04" />
                            <path
                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                fill="#ea4335" />
                        </svg>
                    </div>
                    <span className="ml-4">
                        Sign Up with Google
                    </span>
                </button>
              </div>
              <p className="text-sm font-light text-black text-center dark:text-gray-400">Already have an account? <Link
                className="font-medium text-blue-600 underline dark:text-blue-500" to={'/login'}>Sign in here</Link>
              </p>
              {errorMsg && <p className="text-md font-semibold text-red-600 text-center">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp
