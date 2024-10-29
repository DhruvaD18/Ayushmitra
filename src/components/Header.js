/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import {clearUser } from './utils/UserSlice'
import { useDispatch, useSelector } from 'react-redux';
import { clearType } from './utils/TypeSlice'

const Header = () => {

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const type = useSelector((state)=>state.type.value)

  const handleClick = () =>{
    dispatch(clearUser())
    dispatch(clearType())
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,aadhar} = user;
        // console.log(aadhar)
        dispatch(setUser({uid:uid,email:email,name:displayName,aadhar:aadhar}))
        // ...
      } else {
        // User is signed out
        dispatch(clearUser())
        dispatch(clearType())
        // ...
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <div className='h-16 mx-5'>
          <img alt="team" className="h-full rounded-md" src="https://i.ibb.co/QbPrTBc/Whats-App-Image-2024-10-29-at-11-07-23-68b62c45.jpg" />
        </div>
          <span className="ml-1 text-xl">AYUSHMITRA</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to={'/'}>Home</Link>
          
          
          {type && type.type==='patient' && <Link className="mr-5 hover:text-gray-900" to={'/about'}>Hospitals</Link>}
          <Link className="mr-5 hover:text-gray-900" to={'/about'}>About</Link>
          <Link className="mr-5 hover:text-gray-900" to={'/contactus'}>ContactUs</Link>
          <Link className="mr-5 hover:text-gray-900" to={'https://patients-data.vercel.app/'}>Patients</Link>
          <Link className="mr-5 hover:text-gray-900" to={'https://ayushmitra-bot.streamlit.app/'}>Ayush-AI</Link>
        </nav>
        {user && <div className='flex gap-5 items-center'>
          <Link to={'/userprofile'}><img src='https://tse4.mm.bing.net/th?id=OIP.xk_dSiIK7c695LbAQ3Ua3gHaHa&pid=Api&P=0&h=180' alt='userImg' className='h-10 w-10 rounded-full' /></Link>
          <Link to={'/'}>
            <button onClick={handleClick} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">LogOut
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            </Link>
          </div>
        }
        {!user && <Link to={'/login'}>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">LogIn
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>}
      </div>
    </header>
  )
}

export default Header
