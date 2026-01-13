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
import AuthLayout from '../Layouts/AuthLayout';
import ForgetPassword from '../Pages/Auth/ForgetPassword/ForgetPassword';
import Register from '../Pages/Auth/Register/Register';
import Login from '../Pages/Auth/Login/Login';
import PublicLessons from '../Pages/PublicLessons/PublicLessons';
import Pricing from '../Pages/Pricing/Pricing';
import PrivateRoutes from './PrivateRoutes';
import DashboardLayout from '../Layouts/DashboardLayout';
import Addlesson from '../Pages/Dashboard/AddLesson/Addlesson';
import MyLessons from '../Pages/Dashboard/MyLessons/MyLessons';
import PaymentSuccess from '../Pages/Pricing/PaymentSuccess';
import PaymentCancel from '../Pages/Pricing/PaymentCancel';
import Profile from '../Pages/Dashboard/Profile/Profile';
import UpdateProfile from '../Pages/Dashboard/Profile/UpdateProfile/UpdateProfile';
import LessonDetails from '../Pages/LessonDetails/LessonDetails';
import SaveLessons from '../Pages/Dashboard/SaveLesson/SaveLessons';
import UpdateLesson from '../Pages/Dashboard/UpdateLesson/UpdateLesson';
import DashboardHome from '../Pages/Dashboard/Dashboard/DashboardHome';

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
      {
        path: '/publicLessons',
        element: <PublicLessons />,
      },
      {
        path: '/publicLessons/:id',
        loader: async ({ params }) =>
          fetch(`http://localhost:5001/lessons/${params.id}`),
        element: (
          <PrivateRoutes>
            <LessonDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: '/payment-cancel',
        element: <PaymentCancel />,
      },
      {
        path: '/pricing',
        element: (
          <PrivateRoutes>
            <Pricing />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'add-lesson',
        element: <Addlesson />,
      },
      {
        path: 'my-lessons',
        element: <MyLessons />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'update-profile',
        element: <UpdateProfile />,
      },
      {
        path: 'save-lessons',
        element: <SaveLessons />,
      },
      {
        path: 'update-lesson/:id',
        loader: async ({ params }) =>
          fetch(`http://localhost:5001/lessons/${params.id}`),
        element: <UpdateLesson />,
      },
    ],
  },
]);

export default Routes;
