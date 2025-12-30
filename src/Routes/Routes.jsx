import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from '../Pages/Home';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import MainLayouts from '../Layouts/MainLayouts';

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
    ],
  },
]);

export default Routes;
