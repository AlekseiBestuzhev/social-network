import { PaginationBlock } from "@/components/common/PaginationBlock/PaginationBlock";
import { PageTemplate } from "@/components/common/PageTemplate/PageTemplate";
import { UsersType } from "@/components/Pages/Users/UsersContainer";
import { Loading } from "@/components/common/Loading/Loading";
import cls from '@/components/Pages/Users/Users.module.scss';
import { User } from "@/components/Pages/Users/User/User";
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