import { PaginationBlock } from "@/components/common/PaginationBlock/PaginationBlock.tsx";
import { PageTemplate } from "@/components/common/PageTemplate/PageTemplate.tsx";
import { UsersType } from "@/Pages/Users/UsersContainer.tsx";
import { Loading } from "@/components/common/Loading/Loading.tsx";
import cls from '@/Pages/Users/Users.module.scss';
import { User } from "@/features/users/components/User/User.tsx";
import { FC } from "react";

export const Users: FC<UsersType> = (props) => {

	const userList = props.users.map(u => (
		<User
			key={u.id}
			id={u.id}
			photos={u.photos}
			name={u.name}
			uniqueUrlName={u.uniqueUrlName}
			followed={u.followed}
			status={u.status}
			setFollowingThunkCreator={props.setFollowingThunkCreator}
			followingInProgress={props.followingInProgress}
		/>
	));

	return (
		<PageTemplate pageTitle="Users">
			{props.isFetching && <Loading />}
			<nav className={cls.wrapper}>
				<PaginationBlock
					pageSize={props.pageSize}
					totalUsersCount={props.totalUsersCount}
					onPageChange={props.onPageChange}
				/>
			</nav>
			<ul className={cls.list}>
				{userList}
			</ul>
		</PageTemplate>
	)
}