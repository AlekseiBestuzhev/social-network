import { getUsersThunkCreator, setFollowingThunkCreator } from "@/redux/users/users-thunks";
import { UserType, setCurrentPage } from "@/redux/users/users-reducer";
import { withAuthRedirect } from "@/hoc/withAuthRedirect";
import { Users } from "@/components/Pages/Users/Users";
import { AppStateType } from "@/redux/redux-store";
import { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

class UsersAPIContainer extends Component<UsersAPIContainerType> {

	componentDidMount() {
		this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
	}

	onPageChange = async (newPage: number) => {
		this.props.setCurrentPage(newPage);
		this.props.getUsersThunkCreator(newPage, this.props.pageSize);
	}

	render() {
		return <Users {...this.props} onPageChange={this.onPageChange} />
	}
}

type MapStateToPropsType = {
	pageSize: number,
	users: UserType[],
	currentPage: number,
	isFetching: boolean,
	totalUsersCount: number,
	followingInProgress: number[],
}

type MapDispatchToPropsType = {
	setCurrentPage: (currentPage: number) => void,
	setFollowingThunkCreator: (id: number, followed: boolean) => void,
	getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

export type UsersAPIContainerType = MapStateToPropsType & MapDispatchToPropsType;
export type UsersType = MapStateToPropsType & {
	setFollowingThunkCreator: (id: number, followed: boolean) => void,
	onPageChange: (newPage: number) => void
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		isFetching: state.usersPage.isFetching,
		currentPage: state.usersPage.currentPage,
		totalUsersCount: state.usersPage.totalUsersCount,
		followingInProgress: state.usersPage.followingInProgress,
	}
}

export const UsersContainer = compose<ComponentType>(
	withAuthRedirect,
	connect(mapStateToProps, {
		setCurrentPage,
		getUsersThunkCreator,
		setFollowingThunkCreator
	} as MapDispatchToPropsType)
)(UsersAPIContainer);