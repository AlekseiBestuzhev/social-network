import { MessagesDataType, MessagesPageType, setCurrentDialog } from "@/features/messages/messages-reducer";
import { LastMessageType, Messages } from "@/pages/Messages/Messages";
import { withAuthRedirect } from "@/app/hoc/withAuthRedirect";
import { Component, ComponentType } from "react";
import { AppRootStateType } from "@/app/store.ts";
import { connect } from "react-redux";
import { compose } from "redux";

type StateType = {
	currentUserName: string,
	lastMessages: LastMessageType[]
}

export type MessagesHandlerType = MapStateToPropsType & MDTPtype & WithRouterType;

class MessagesHandler extends Component<MessagesHandlerType, StateType> {

	constructor(props: MessagesHandlerType) {
		super(props);
		this.state = {
			currentUserName: this.getCurrentUserName(),
			lastMessages: this.getLastMessages(this.props.messagesData)
		}
	}

	getCurrentUserName() {
		const user = this.props.dialogsData.find(el => el.id === this.props.match.params.userID);
		return user?.name || ''
	}

	getLastMessages(messagesData: MessagesDataType) {
		const lastMessages = [];

		for (const userID in messagesData) {
			if (messagesData.hasOwnProperty(userID)) {
				const messages = messagesData[userID];
				const lastMessage = messages[messages.length - 1];

				if (lastMessage) {
					const { text, date } = lastMessage;
					lastMessages.push({ userID, text, date });
				}
			}
		}

		return lastMessages;
	}

	componentDidMount() {
		this.props.setCurrentDialog(this.props.match.params.userID);
	}

	componentDidUpdate(prevProps: MessagesHandlerType) {
		if (prevProps.match.params.userID !== this.props.match.params.userID) {
			this.props.setCurrentDialog(this.props.match.params.userID);
			this.setState({
				currentUserName: this.getCurrentUserName(),
			})
		}
		if (prevProps.messagesData !== this.props.messagesData) {
			this.setState({
				lastMessages: this.getLastMessages(this.props.messagesData)
			})
		}
	}

	render() {

		return (
			<Messages
				dialogsData={this.props.dialogsData}
				lastMessages={this.state.lastMessages}
				currentUserID={this.props.match.params.userID}
				currentUserName={this.state.currentUserName}
				currentMessages={this.props.messagesData[this.props.match.params.userID]}
			/>
		)
	}
}

type MapStateToPropsType = Omit<MessagesPageType, 'newMessageText'>;

type MDTPtype = {
	setCurrentDialog: (userID: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
	messagesData: state.messagesPage.messagesData,
	dialogsData: state.messagesPage.dialogsData,
	currentDialog: state.messagesPage.currentDialog
})

export const MessagesContainer = compose<ComponentType>(
	connect(mapStateToProps, { setCurrentDialog } as MDTPtype),
	withAuthRedirect,
	withRouter
)(MessagesHandler);