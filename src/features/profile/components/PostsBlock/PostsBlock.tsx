import { FC } from 'react';

import { CgAddR } from 'react-icons/cg';

import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { AddItemForm, AddItemFormData } from '@/components/AddItemForm/AddItemForm.tsx';
import { authUserAvatarSelector } from '@/features/auth/selectors/authUserAvatarSelector';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';
import { authUserNameSelector } from '@/features/auth/selectors/authUserNameSelector';
import { Posts } from '@/features/profile/components/PostsBlock/Posts/Posts.tsx';
import cls from '@/features/profile/components/PostsBlock/PostsBlock.module.scss';
import { addPostAC } from '@/features/profile/profile-reducer.ts';

type PostsBlockPropsType = {
  user: string;
};

export const PostsBlock: FC<PostsBlockPropsType> = ({ user }) => {
  const authUserName = useAppSelector(authUserNameSelector)!;
  const authUserID = useAppSelector(authUserIDSelector)?.toString()!;
  const photo = useAppSelector(authUserAvatarSelector);

  const dispatch = useAppDispatch();

  const addPost = (data: AddItemFormData) => {
    dispatch(addPostAC({ message: data.message, userID: authUserID, name: authUserName, photo }));
  };

  return (
    <>
      <div className={cls.formWrapper}>
        <AddItemForm placeholder="Tell about your news..." onSubmit={addPost}>
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
