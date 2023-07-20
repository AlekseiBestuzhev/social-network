import { PostsType } from "@/components/Pages/Profile/PostsBlock/Posts/PostsContainer";
import { PostContainer } from "@/components/Pages/Profile/PostsBlock/Posts/Post/Post";
import cls from '@/components/Pages/Profile/PostsBlock/Posts/Posts.module.scss';

export const Posts: React.FC<PostsType> = ({ postsData }) => {

	const postsList: JSX.Element | JSX.Element[] =
		postsData.length
			? postsData.map(el => (
				<PostContainer
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