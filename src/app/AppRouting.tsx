import { lazy, Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from '@/common/const';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';
import { EditProfile } from '@/pages/EditProfile/EditProfile.tsx';
import { Login } from '@/pages/Login/Login.tsx';
import { Music } from '@/pages/Music/Music.tsx';
import { News } from '@/pages/News/News.tsx';
import { PageNotFound } from '@/pages/PageNotFound/PageNotFound.tsx';
import { Settings } from '@/pages/Settings/Settings.tsx';

const Users = lazy(() => import('@/pages/Users/Users.tsx').then(module => ({ default: module.Users })));
const Profile = lazy(() =>
  import('@/pages/Profile/Profile.tsx').then(module => ({ default: module.Profile })),
);
const Messages = lazy(() =>
  import('@/pages/Messages/Messages.tsx').then(module => ({ default: module.Messages })),
);

export const AppRouting = () => {
  const authUser = useAppSelector(authUserIDSelector);

  return (
    <Routes>
      <Route path={routes.login} element={authUser ? <Navigate to={routes.profile} /> : <Login />} />
      <Route path={routes.base} element={<Navigate to={routes.profile} />} />
      <Route path={routes.profileSettings} element={<EditProfile />} />
      <Route
        path={`${routes.profile}/:userID?`}
        element={
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path={`${routes.messages}/:userID?`}
        element={
          <Suspense fallback={<Loading />}>
            <Messages />
          </Suspense>
        }
      />
      <Route
        path={routes.users}
        element={
          <Suspense fallback={<Loading />}>
            <Users />
          </Suspense>
        }
      />
      <Route path={routes.news} element={<News />} />
      <Route path={routes.music} element={<Music />} />
      <Route path={routes.settings} element={<Settings />} />
      <Route path={routes.pageNotFound} element={<PageNotFound />} />
    </Routes>
  );
};
