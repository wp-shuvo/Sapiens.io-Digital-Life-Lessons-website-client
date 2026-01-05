import React from 'react';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import ContactUs from '../Pages/ContactUs/ContactUs';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Loading from '../Components/ErrorPage/Loading';
import Blog from '../Pages/Blog/Blog';
import ComingSoon from '../Components/ComingSoon/ComingSoon';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loading />,
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
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/aboutUs',
        element: <AboutUs />,
      },
      {
        path: '/comingSoon',
        element: <ComingSoon />,
      },
    ],
  },
]);

export default Routes;
