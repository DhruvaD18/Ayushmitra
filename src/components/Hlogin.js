import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './utils/firebase';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { setType } from './utils/TypeSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hlogin = () => {

  const email = useRef(null)
  const password = useRef(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app)
  const db = getFirestore(app);
  const [errorMessage,seterrorMessage] = useState(null)

  const handleClick = () =>{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "hospital", user.uid);

        // Get the user's role from Firestore
        // console.log('userref',userRef)
        getDoc(userRef)
            .then((docSnap) => {
            if (docSnap.exists()) {
                const role = docSnap.data().role;

                // Dispatch the role and show success toast based on role
                // console.log('role is',role)
                dispatch(setType({ type: role }));

                toast.success('SignIn successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    // Navigate to different dashboards based on role
                    if (role === "hospital") {
                        navigate('/');
                    } else if (role === "patient"){
                        navigate('/');
                    } else {
                        navigate('/'); // Default redirect
                    }
                }
                });
            } else {
                console.log("No such document!");
            }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
        })
        .catch((error) => {
        seterrorMessage(error.code, error.message);
        });
  }

  return (
    <div className="h-fit w-full flex-1 my-20">
      <ToastContainer />
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
        <p className="mt-6 text-s text-gray-600 text-center">Already has an account?<Link className="font-medium text-blue-600 underline dark:text-blue-500"  to={'/hospital-signUp'}>Sign Up</Link></p>
        {errorMessage && <p className="text-md font-semibold text-red-600 text-center">{errorMessage}</p>}
      </div>
    </div>                
  )
}

export default Hlogin
