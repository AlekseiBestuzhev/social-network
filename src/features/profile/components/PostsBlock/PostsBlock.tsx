import { FC } from 'react';

import { CgAddR } from 'react-icons/cg';

import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { AddItemForm } from '@/components/AddItemForm/AddItemForm.tsx';
import { Posts } from '@/features/profile/components/PostsBlock/Posts/Posts.tsx';
import cls from '@/features/profile/components/PostsBlock/PostsBlock.module.scss';
import { addPostAC, updatePostTexAC } from '@/features/profile/profile-reducer.ts';

type PostsBlockPropsType = {
  user: string;
};

export const PostsBlock: FC<PostsBlockPropsType> = ({ user }) => {
  const dispatch = useAppDispatch();
  // currentText selector will be removed after form lib connecting
  const currentText = useAppSelector(state => state.profile.newPostText);

  const updateCurrentText = (text: string) => {
    dispatch(updatePostTexAC(text));
  };

  const addText = (userID: string, name: string, photo: string | null) => {
    dispatch(addPostAC(userID, name, photo));
  };

  return (
    <>
      <div className={cls.formWrapper}>
        <AddItemForm
          placeholder="Tell about your news..."
          currentText={currentText}
          addText={addText}
          updateCurrentText={updateCurrentText}
        >
          Share <CgAddR size="16px" />
        </AddItemForm>
      </div>
      <div className={cls.postsWrapper}>
        <div className={cls.title}>{user} wall</div>
        <Posts />
      </div>
    </>
  );
};
