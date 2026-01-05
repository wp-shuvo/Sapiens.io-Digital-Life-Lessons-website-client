import React from 'react';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import ContactUs from '../Pages/ContactUs/ContactUs';
import AboutUs from '../Pages/AboutUs/AboutUs';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: (
      <div className="w-full h-full flex justify-center mt-2.5">
        <span className="loading loading-dots content-center loading-xl"></span>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: '/aboutUs',
        element: <AboutUs />,
      },
    ],
  },
]);

export default Routes;
