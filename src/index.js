import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import appStore from './components/utils/appStore'
import UserProfile from './components/UserProfile';
import Hlogin from './components/Hlogin';
import HsignUp from './components/HsignUp';

const Structure = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Structure />,
    children:[
      {
        path:'/',
        element:<App />
      },
      {
        path:'/about',
        element:<About />
      },
      {
        path:'/contactus',
        element:<ContactUs />
      },
      {
        path:'/login',
        element:<LogIn />
      },
      {
        path:'/signup',
        element:<SignUp />
      },
      {
        path:'/userprofile',
        element:<UserProfile />
      },
      {
        path:'/hospital-login',
        element:<Hlogin />
      },
      {
        path:'/hospital-signUp',
        element:<HsignUp />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
