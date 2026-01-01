import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EventDetailPage from '../components/schedule/EventDetailPage';
import { ROUTE_PATHS } from './routePaths';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATHS.HOME} replace />,
      },
      {
        path: ROUTE_PATHS.HOME,
        element: <HomeScreen />,
      },
      {
        path: ROUTE_PATHS.STATS,
        element: <StatsScreen />,
      },
      {
        path: ROUTE_PATHS.SCHEDULE,
        element: <ScheduleScreen />,
      },
      {
        path: ROUTE_PATHS.MESSAGES,
        element: <MessagesScreen />,
      },
      {
        path: ROUTE_PATHS.EVENT_DETAIL,
        element: <EventDetailPage />,
      },
    ],
  },
]);
