import { AppRootStateType } from '@/app/store.ts';
import { PostType } from '@/features/profile/components/PostsBlock/Posts/Post/Post.tsx';

export const postsSelector = (state: AppRootStateType): PostType[] => state.profile.postsData;
