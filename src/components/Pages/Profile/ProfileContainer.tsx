import { Profile, ProfilePropsType } from "@/components/Pages/Profile/Profile";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { UserProfileType } from "@/redux/profile/profile-reducer";
import { Loading } from "@/components/common/Loading/Loading";
import { withAuthRedirect } from "@/hoc/withAuthRedirect";
import { AppStateType } from "@/redux/redux-store";
import { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
	switchFollowingOnProfileThunkCreator,
	getFollowingOnProfileThunkCreator,
	setUserProfileThunkCreator,
	getUserStatusThunkCreator
} from "@/redux/profile/profile-thunks";

type ProfileAPIContainerType = ProfilePropsType
	& { authUser: Omit<MapStateToPropsType, 'profile'> }
	& WithRouterType
	& MapDispatchToPropsType;

type StateType = {
	currentUser: number | null
}

class ProfileAPIContainer extends Component<ProfileAPIContainerType, StateType> {

	constructor(props: ProfileAPIContainerType) {
		super(props)
		this.state = {
			currentUser: Number(this.props.match.params.userID || this.props.authUser)
		}
	}

	fetchUserProfile(user: number | null) {
		if (user) {
			this.props.setUserProfileThunkCreator(user);
			this.props.getUserStatusThunkCreator(user);
		}
	}

	toProfileSettings() {
		this.props.history.push('/profile-settings');
	}

	componentDidMount() {
		this.fetchUserProfile(this.state.currentUser);
		if (this.props.match.params.userID) {
			this.props.getFollowingOnProfileThunkCreator(Number(this.props.match.params.userID));
		}
	}

	async componentDidUpdate(prevProps: ProfileAPIContainerType) {
		if (prevProps.match.params.userID !== this.props.match.params.userID) {
			await this.setState({ currentUser: Number(this.props.match.params.userID || this.props.authUser) });
			this.fetchUserProfile(this.state.currentUser);
		}
	}

	render() {
		return this.props.profile
			? <Profile
				status={this.props.status}
				profile={this.props.profile}
				followed={this.props.followed}
				isMe={!this.props.match.params.userID}
				followingInProgress={this.props.followingInProgress}
				toProfileSettings={this.toProfileSettings.bind(this)}
				switchFollowingOnProfileThunkCreator={this.props.switchFollowingOnProfileThunkCreator}
			/>
			: <Loading />
	}
}

export type PathParamsType = {
	userID: string
}

export type WithRouterType = RouteComponentProps<PathParamsType>;

type MapDispatchToPropsType = {
	switchFollowingOnProfileThunkCreator: (id: number, followed: boolean) => void,
	getFollowingOnProfileThunkCreator: (id: number) => void,
	setUserProfileThunkCreator: (id: number) => void,
	getUserStatusThunkCreator: (id: number) => void
}

type MapStateToPropsType = {
	profile: UserProfileType | null,
	followingInProgress: boolean,
	authUser: number | null,
	followed: boolean,
	status: string
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
	followingInProgress: state.profilePage.followingInProgress,
	followed: state.profilePage.followed,
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authUser: state.auth.id
})

export const ProfileContainer = compose<ComponentType>(
	connect(mapStateToProps, {
		getUserStatusThunkCreator,
		setUserProfileThunkCreator,
		getFollowingOnProfileThunkCreator,
		switchFollowingOnProfileThunkCreator
	} as MapDispatchToPropsType),
	withAuthRedirect,
	withRouter
)(ProfileAPIContainer);