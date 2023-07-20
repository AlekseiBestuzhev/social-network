import { PostType } from "@/components/Pages/Profile/PostsBlock/Posts/Post/Post";
import { Posts } from "@/components/Pages/Profile/PostsBlock/Posts/Posts";
import { AppStateType } from "@/redux/redux-store";
import { connect } from "react-redux";

export type PostsType = {
	postsData: PostType[]
}

const mapStateToProps = (state: AppStateType): PostsType => {
	return {
		postsData: state.profilePage.postsData
	}
}

export const PostsContainer = connect(mapStateToProps)(Posts);