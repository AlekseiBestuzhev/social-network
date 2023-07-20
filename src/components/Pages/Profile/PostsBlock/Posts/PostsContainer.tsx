import { PostType } from "@/components/Pages/Profile/PostsBlock/Posts/Post/Post";
import { Posts } from "@/components/Pages/Profile/PostsBlock/Posts/Posts";
import { AppRootStateType } from "@/app/store.ts";
import { connect } from "react-redux";

export type PostsType = {
	postsData: PostType[]
}

const mapStateToProps = (state: AppRootStateType): PostsType => {
	return {
		postsData: state.profilePage.postsData
	}
}

export const PostsContainer = connect(mapStateToProps)(Posts);