import {NewPostContainer} from "@/features/profile/components/PostsBlock/NewPost/NewPostContainer.tsx";
import cls from '@/features/profile/components/PostsBlock/PostsBlock.module.scss';
import {Posts} from "@/features/profile/components/PostsBlock/Posts/Posts.tsx";
import {CgAddR} from "react-icons/cg";
import {FC} from "react";

type PostsBlockPropsType = {
   userName: string,
   isMe: boolean
}

export const PostsBlock: FC<PostsBlockPropsType> = ({userName, isMe}) => {

   const owner = isMe ? 'My ' : `${userName}'s `

   return (
      <>
         <div className={cls.formWrapper}>
            <NewPostContainer placeholder="Tell about your news...">
               Share <CgAddR size={'16px'}/>
            </NewPostContainer>
         </div>
         <div className={cls.postsWrapper}>
            <div className={cls.title}>{owner} wall</div>
            <Posts/>
         </div>
      </>
   )
}