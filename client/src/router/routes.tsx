import { Navigate, type RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import BuyerPreference from '../pages/BuyerPreference';
import NotFound from '../pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/buyer-preferences',
    element: <BuyerPreference />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
