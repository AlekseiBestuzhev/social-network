import { Profile, ProfilePropsType } from "@/components/Pages/Profile/Profile";
import { UserProfileType } from "@/features/profile/profile-reducer.ts";
import { Loading } from "@/components/common/Loading/Loading";
import { withAuthRedirect } from "@/hoc/withAuthRedirect";
import { AppRootStateType } from "@/app/store.ts";
import { ComponentType, FC, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
	switchFollowingOnProfileThunkCreator,
	getFollowingOnProfileThunkCreator,
	setUserProfileThunkCreator,
	getUserStatusThunkCreator
} from "@/features/profile/profile-thunks.ts";
import { useNavigate, useParams } from "react-router-dom";

type ProfileAPIContainerType = ProfilePropsType
	& { authUser: Omit<MapStateToPropsType, 'profile'> }
	& MapDispatchToPropsType;

const ProfileAPIContainer: FC<ProfileAPIContainerType> = (props) => {

	const { userID } = useParams();
	const navigate = useNavigate();
	const currentUser = Number(userID || props.authUser);

	useEffect(() => {
		fetchUserProfile(currentUser);
		if (userID) {
			props.getFollowingOnProfileThunkCreator(Number(userID));
		}
	}, [currentUser])

	const fetchUserProfile = (user: number) => {
		if (user) {
			props.setUserProfileThunkCreator(user);
			props.getUserStatusThunkCreator(user);
		}
	}

	const toProfileSettings = () => {
		navigate('/profile-settings');
	}

	return (
		props.profile
			? <Profile
				status={props.status}
				profile={props.profile}
				followed={props.followed}
				isMe={!userID}
				followingInProgress={props.followingInProgress}
				toProfileSettings={toProfileSettings}
				switchFollowingOnProfileThunkCreator={props.switchFollowingOnProfileThunkCreator}
			/>
			: <Loading />
	)
}

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

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
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
	withAuthRedirect
)(ProfileAPIContainer);