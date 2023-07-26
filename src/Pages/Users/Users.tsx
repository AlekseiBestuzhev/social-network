import {PaginationBlock} from "@/components/common/PaginationBlock/PaginationBlock.tsx";
import {appStatusSelector} from "@/features/service/selectors/appStatusSelector";
import {PageTemplate} from "@/components/common/PageTemplate/PageTemplate.tsx";
import {getUsersThunkCreator} from "@/features/users/users-thunks.ts";
import {useUsersData} from "@/features/users/hooks/useUsersData.ts";
import {setCurrentPage} from "@/features/users/users-reducer.ts";
import {withAuthRedirect} from "@/app/hoc/withAuthRedirect.tsx";
import {Loading} from "@/components/common/Loading/Loading.tsx";
import {User} from "@/features/users/components/User/User.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import cls from '@/Pages/Users/Users.module.scss';
import {useEffect} from "react";

export const Users = withAuthRedirect(() => {

   const {followList, totalUsersCount, currentPage, pageSize, users} = useUsersData();

   const appStatus = useAppSelector(appStatusSelector);

   const loading = appStatus === 'loading';

   const dispatch = useAppDispatch();

   const userList = users.map(u => (
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
   ));

   const onPageChange = (newPage: number) => {
      dispatch(setCurrentPage(newPage));
      dispatch(getUsersThunkCreator(newPage, pageSize));
   }

   useEffect(() => {
      dispatch(getUsersThunkCreator(currentPage, pageSize));
      return () => {
         onPageChange(1);
      }
   }, []);

   return (
      <PageTemplate pageTitle="Users">
         <nav className={cls.wrapper}>
            <PaginationBlock
               pageSize={pageSize}
               onPageChange={onPageChange}
               totalUsersCount={totalUsersCount}
            />
         </nav>
         {loading && <Loading/>}
         <ul className={cls.list}>
            {userList}
         </ul>
      </PageTemplate>
   )
})