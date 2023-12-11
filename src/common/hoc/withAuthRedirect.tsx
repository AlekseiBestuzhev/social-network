import { ComponentType } from 'react';

import { Navigate } from 'react-router-dom';

import { routes } from '@/common/const';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';

export const withAuthRedirect = <T,>(Component: ComponentType<T>) => {
  return (props: T) => {
    const isAuth = useAppSelector(authUserIDSelector);

    return isAuth ? <Component {...(props as T & object)} /> : <Navigate to={routes.login} />;
  };
};
