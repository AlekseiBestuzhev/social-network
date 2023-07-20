import { NewPostContainer } from "@/components/Pages/Profile/PostsBlock/NewPost/NewPostContainer";
import { PostsContainer } from "@/components/Pages/Profile/PostsBlock/Posts/PostsContainer";
import cls from '@/components/Pages/Profile/PostsBlock/PostsBlock.module.scss';
import { CgAddR } from "react-icons/cg";
import { FC } from "react";

type PostsBlockPropsType = {
	userName: string,
	isMe: boolean
}

export const PostsBlock: FC<PostsBlockPropsType> = ({ userName, isMe }) => {

	const owner = isMe ? 'My ' : `${userName}'s `

	return (
		<>
			<div className={cls.formWrapper}>
				<NewPostContainer placeholder="Tell about your news...">
					Share <CgAddR size={'16px'} />
				</NewPostContainer>
			</div>
			<div className={cls.postsWrapper}>
				<div className={cls.title}>{owner} wall</div>
				<PostsContainer />
			</div>
		</>
	)
}