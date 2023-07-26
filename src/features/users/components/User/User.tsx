import {setFollowingThunkCreator} from "@/features/users/users-thunks.ts";
import cls from '@/features/users/components/User/User.module.scss';
import {Button} from '@/components/common/Button/Button.tsx';
import {Avatar} from '@/components/common/Avatar/Avatar.tsx';
import {UserType} from '@/features/users/users-reducer.ts';
import {useAppDispatch} from "@/app/hooks.ts";
import {NavLink} from 'react-router-dom';
import {FC, memo} from 'react';

type UserItemListType = UserType & {
   followingInProgress: number[]
}

export const User: FC<UserItemListType> = memo(({
                                              id,
                                              photos,
                                              name,
                                              uniqueUrlName,
                                              followed,
                                              status,
                                              followingInProgress
                                           }) => {

   const dispatch = useAppDispatch();

   const followHandler = (id: number, followed: boolean) => () => {
      dispatch(setFollowingThunkCreator(id, followed));
   }

   const followBtnText = followed ? 'unfollow' : 'follow';

   const buttonVariant = followBtnText === 'follow' ? 'green' : 'default';

   return (
      <li className={cls.body}>
         <div className={cls.imgBtn}>
            <NavLink to={`/profile/${id}`}>
               <Avatar photo={photos.large}/>
            </NavLink>
            <Button
               disabled={followingInProgress.some(elemID => elemID === id)}
               variant={buttonVariant}
               size='small'
               onClick={followHandler(id, followed)}
            >
               {followBtnText}
            </Button>
         </div>
         <div className={cls.info}>
            <div className={cls.nameStatus}>
               <NavLink to={`/profile/${id}`}>
                  <h3 className={cls.name} data-url={uniqueUrlName}>{name}</h3>
               </NavLink>
               {status && <p className={cls.status}>"{status}"</p>}
            </div>
            <div className={cls.location}>
               <p className={cls.city}>City</p>
               <p className={cls.country}>Country</p>
            </div>
         </div>
      </li>
   );
})