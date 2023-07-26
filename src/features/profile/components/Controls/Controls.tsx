import {switchFollowingOnProfileTC} from "@/features/profile/profile-thunks.ts";
import cls from '@/features/profile/components/Controls/Controls.module.scss'
import {Button} from '@/components/Button/Button.tsx';
import {RiUserUnfollowLine} from "react-icons/ri";
import {RiUserAddLine} from "react-icons/ri";
import {useAppDispatch} from "@/app/hooks.ts";
import {RiChat3Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {FC, memo} from 'react';

type ControlsPropsType = {
   userID: number,
   followingInProgress: boolean,
   followed: boolean,
   isMe: boolean
}

export const Controls: FC<ControlsPropsType> = memo(({
                                                        followingInProgress,
                                                        followed,
                                                        userID,
                                                        isMe
                                                     }) => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const followHandler = (id: number, followed: boolean) => () => {
      dispatch(switchFollowingOnProfileTC(id, followed));
   }

   const toProfileSettings = () => {
      navigate('/profile/settings');
   }

   const followTextHandler = followed ? 'Unfollow' : 'Follow';
   const followIconHandler = followed ? <RiUserUnfollowLine size={'1rem'}/> : <RiUserAddLine size={'1rem'}/>;
   const buttonStyles = !followed ? 'green' : 'default';

   return (
      <div className={cls.wrapper}>
         {
            isMe
               ? <Button
                  onClick={toProfileSettings}
                  variant='white'
                  size='large'>
                  Edit profile
               </Button>
               : <>
                  <Button
                     onClick={() => alert('Chat will work later')}
                     variant='white'
                     size='large'>
                     Message <RiChat3Line size={'1rem'}/>
                  </Button>
                  <Button
                     disabled={followingInProgress}
                     variant={buttonStyles}
                     onClick={followHandler(userID, followed)}
                     size='large'>
                     {followTextHandler}{followIconHandler}
                  </Button>
               </>
         }
      </div>
   );
})