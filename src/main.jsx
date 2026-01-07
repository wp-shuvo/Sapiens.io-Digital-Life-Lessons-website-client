import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { RouterProvider } from 'react-router';
import Routes from './Routes/Routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes} />
      </AuthProvider>
    </QueryClientProvider>
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>
);
