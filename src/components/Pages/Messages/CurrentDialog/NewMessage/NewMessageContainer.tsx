import { updateMessageTextAC, addMessageAC } from "@/redux/messages/messages-reducer";
import { AddItemForm } from "@/components/common/AddItemForm/AddItemForm";
import { AppStateType } from "@/redux/redux-store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

type MapStateToPropsType = {
	currentText: string,
}

type MapDispatchToPropsType = {
	updateCurrentText: (text: string) => void,
	addText: (userID: string, name: string, photo: string | null) => void
}

export type NewMessageType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		currentText: state.messagesPage.newMessageText,
	}
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
	return {
		updateCurrentText: (text: string) => {
			const action = updateMessageTextAC(text);
			dispatch(action);
		},
		addText: (userID: string, name: string, photo: string | null) => {
			const action = addMessageAC(userID, name, photo);
			dispatch(action);
		}
	}
}

export const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(AddItemForm);