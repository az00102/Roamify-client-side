import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './components/Root';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AuthProvider from './providers/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';
import AddTouristSpot from './components/AddTouristSpot';
import AllTouristSpots from './components/AllTouristSpots';
import MyList from './components/MyList';
import UpdateSpotForm from './components/UpdateSpotForm';
import ViewDetail from './components/ViewDetail';
import TouristSpotCard from './components/TouristSpotCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: () => fetch('https://b9-a10-server-seven.vercel.app/api/tourist-spots')
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/addtouristspot',
        element: <ProtectedRoute><AddTouristSpot /></ProtectedRoute>,
      },
      {
        path: '/mylist',
        element: <ProtectedRoute><MyList /></ProtectedRoute>,
      },
      {
        path: '/updatespotform/:id',
        element: <ProtectedRoute><UpdateSpotForm /></ProtectedRoute>,
      },
      {
        path: '/viewdetail/:spotId',
        element: <ProtectedRoute><ViewDetail /></ProtectedRoute>,
      },
      {
        path: '/alltouristspot',
        element: <AllTouristSpots />,
      },
      {
        path: '/tourist-spots/:countryName',
        element: <TouristSpotCard />,
      },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>

  </React.StrictMode>,
);
