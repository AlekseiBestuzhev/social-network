import { updatePostTexAC, addPostAC } from "@/redux/profile/profile-reducer";
import { AddItemForm } from "@/components/common/AddItemForm/AddItemForm";
import { AppStateType } from "@/redux/redux-store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

type MapStateToPropsType = {
	currentText: string
}

type MapDispatchToPropsType = {
	updateCurrentText: (text: string) => void,
	addText: (userID: string, name: string, photo: string | null) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		currentText: state.profilePage.newPostText,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
	return {
		updateCurrentText: (text: string) => {
			const action = updatePostTexAC(text);
			dispatch(action);
		},
		addText: (userID: string, name: string, photo: string | null) => {
			const action = addPostAC(userID, name, photo);
			dispatch(action);
		}
	}
}

export const NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(AddItemForm)