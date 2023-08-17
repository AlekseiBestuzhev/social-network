import {PostType} from "@/features/profile/components/PostsBlock/Posts/Post/Post.tsx";
import { AppRootStateType } from "@/app/store.ts";

export const postsSelector = (state: AppRootStateType): PostType[] => state.profile.postsData;