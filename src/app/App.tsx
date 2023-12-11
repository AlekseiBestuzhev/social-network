import { useEffect, useLayoutEffect } from 'react';

import { AppRouting } from '@/app/AppRouting.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { Layout } from '@/components/Layout/Layout.tsx';
import { Loading } from '@/components/Loading/Loading.tsx';
import { authThunkCreator } from '@/features/auth/auth-thunks.ts';
import { isAppInitSelector } from '@/features/service/selectors/isAppInitSelector';
import { useTheme } from '@/features/theme/hooks/useTheme.ts';

export const App = () => {
  const isAppInit = useAppSelector(isAppInitSelector);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    dispatch(authThunkCreator());
  }, []);

  return isAppInit ? (
    <Layout>
      <AppRouting />
    </Layout>
  ) : (
    <Loading />
  );
};
