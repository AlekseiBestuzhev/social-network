import { useEffect } from 'react';

import cls from './Users.module.scss';

import { withAuthRedirect } from '@/common/hoc/withAuthRedirect.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { Loading } from '@/components/Loading/Loading.tsx';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate.tsx';
import { PaginationBlock } from '@/components/PaginationBlock/PaginationBlock.tsx';
import { appStatusSelector } from '@/features/service/selectors/appStatusSelector';
import { User } from '@/features/users/components/User/User.tsx';
import { useUsersData } from '@/features/users/hooks/useUsersData.ts';
import { setCurrentPage } from '@/features/users/users-reducer.ts';
import { getUsersThunkCreator } from '@/features/users/users-thunks.ts';

export const Users = withAuthRedirect(() => {
  const { followList, totalUsersCount, currentPage, pageSize, users } = useUsersData();

  const appStatus = useAppSelector(appStatusSelector);

  const loading = appStatus === 'loading';

  const dispatch = useAppDispatch();

  const onPageChange = (newPage: number) => {
    void dispatch(setCurrentPage(newPage));
    void dispatch(getUsersThunkCreator(newPage, pageSize));
  };

  useEffect(() => {
    void dispatch(getUsersThunkCreator(currentPage, pageSize));

    return () => {
      onPageChange(1);
    };
  }, []);

  return (
    <PageTemplate pageTitle="Users">
      <nav className={cls.wrapper}>
        <PaginationBlock pageSize={pageSize} onPageChange={onPageChange} totalUsersCount={totalUsersCount} />
      </nav>
      {loading && <Loading />}
      <ul className={cls.list}>
        {users.map(u => (
          <User
            key={u.id}
            id={u.id}
            photos={u.photos}
            name={u.name}
            uniqueUrlName={u.uniqueUrlName}
            followed={u.followed}
            status={u.status}
            followingInProgress={followList}
          />
        ))}
      </ul>
    </PageTemplate>
  );
});
