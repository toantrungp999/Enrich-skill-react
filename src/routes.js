import { lazy } from 'react';

const routes = [
  {
    path: '/',
    component: lazy(() => import('pages/LandingPage')),
    exact: true,
  },
  {
    path: '/sign-in',
    component: lazy(() => import('pages/SignInPage')),
    exact: true,
    hideAfterAuth: true,
  },
  {
    path: '/sign-up',
    component: lazy(() => import('pages/SignUpPage')),
    exact: true,
    hideAfterAuth: true,
  },
  {
    path: '/profile',
    component: lazy(() => import('pages/ProfilePage')),
    requiredAuth: true,
  },
  {
    path: '*',
    component: lazy(() => import('pages/NotFoundPage')),
    exact: true,
    hideAfterAuth: true,
  },
];

export default routes;
