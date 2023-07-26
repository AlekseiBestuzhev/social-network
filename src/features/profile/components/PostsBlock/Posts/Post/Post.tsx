import cls from '@/features/profile/components/PostsBlock/Posts/Post/Post.module.scss';
import {removeLike, setLike} from '@/features/profile/profile-reducer.ts';
import {Avatar} from '@/components/Avatar/Avatar.tsx';
import {RiHeart3Line} from 'react-icons/ri';
import {RiHeart3Fill} from 'react-icons/ri';
import {useAppDispatch} from '@/app/hooks.ts';
import {FC} from 'react';

export type PostType = {
   id: string,
   text: string,
   likes: number,
   myLike: boolean,
   time: string,
   date: string,
   userID: string,
   name: string,
   photo: string | null
}

export const Post: FC<PostType> = ({
                                      id,
                                      text,
                                      likes,
                                      myLike,
                                      time,
                                      date,
                                      userID,
                                      name,
                                      photo
                                   }) => {

   const dispatch = useAppDispatch();
   const likeHandler = () => {
      if (myLike) dispatch(removeLike(id));
      else dispatch(setLike(id));
   }

   return (
      <div className={cls.post}>
         <Avatar size='5rem' photo={photo}/>
         <div className={cls.sender}>
            <div className={cls.info}>
               <p className={cls.name} data-id={userID}>{name}</p>
               <p className={cls.date}>
                  <span>{time}</span>
                  <span>{date}</span>
               </p>
            </div>
            <p className={cls.text}>{text}</p>
            <div className={cls.likes}>
               <span className={cls.likesCount}>{likes}</span>
               {
                  myLike
                     ? <RiHeart3Fill onClick={likeHandler}/>
                     : <RiHeart3Line onClick={likeHandler}/>
               }
            </div>
         </div>
      </div>
   );
}