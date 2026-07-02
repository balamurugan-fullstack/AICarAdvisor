import { Navigate, type RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />, 
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
  {
    path: '/404',
    element: <NotFound />, 
  },
];
