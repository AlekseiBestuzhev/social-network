import cls from "@/features/profile/components/PostsBlock/Posts/Posts.module.scss";
import {Post} from "@/features/profile/components/PostsBlock/Posts/Post/Post.tsx";
import {postsSelector} from "@/features/profile/selectors/postsSelector";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

export const Posts = () => {
   const postsData = useAppSelector(postsSelector);

   const postsList = postsData.length
         ? postsData.map(el => (
            <Post
               key={el.id}
               id={el.id}
               text={el.text}
               likes={el.likes}
               myLike={el.myLike}
               time={el.time}
               date={el.date}
               userID={el.userID}
               name={el.name}
               photo={el.photo}
            />
         ))
         : <div>Your wall is empty...</div>

   return (
      <div className={cls.wrapper}>
         {postsList}
      </div>
   )
}