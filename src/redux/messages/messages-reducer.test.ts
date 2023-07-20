import { MessagesPageType, MessagesReducer, addMessageAC, setCurrentDialog, updateMessageTextAC } from "./messages-reducer";


let initialState: MessagesPageType;

beforeEach(() => {
	initialState = {
		dialogsData: [
			{ id: 'local_meladze', name: 'В. Меладзе', avatar: null },
			{ id: 'local_the-badman', name: 'The Badman', avatar: null },
		],
		messagesData: {
			'local_meladze': [],
			'local_the-badman': [],
		},
		newMessageText: '',
		currentDialog: 'local_meladze',
	};
});

test('should update the message text', () => {
	const newText = 'New message';

	const action = updateMessageTextAC(newText);
	const newState = MessagesReducer(initialState, action);

	expect(newState.newMessageText).toBe(newText);
	expect(newState.dialogsData).toEqual(initialState.dialogsData);
	expect(newState.messagesData).toEqual(initialState.messagesData);
	expect(newState.currentDialog).toEqual(initialState.currentDialog);
});

test('should add a new message to the messages data', () => {
	const userID = 'local_meladze';
	const name = 'В. Меладзе';
	const photo = null;

	const action = addMessageAC(userID, name, photo);
	const newState = MessagesReducer(initialState, action);

	expect(newState.messagesData[userID]).toHaveLength(1);
	expect(newState.messagesData[userID][0].userID).toBe(userID);
	expect(newState.messagesData[userID][0].userName).toBe(name);
	expect(newState.messagesData[userID][0].avatar).toBe(photo);

	expect(newState.dialogsData).toEqual(initialState.dialogsData);
	expect(newState.newMessageText).toEqual(initialState.newMessageText);
	expect(newState.currentDialog).toEqual(initialState.currentDialog);
});

test('should set the current dialog', () => {
	const userID = 'local_the-badman';

	const action = setCurrentDialog(userID);
	const newState = MessagesReducer(initialState, action);

	expect(newState.currentDialog).toBe(userID);
	expect(newState.dialogsData).toEqual(initialState.dialogsData);
	expect(newState.messagesData).toEqual(initialState.messagesData);
	expect(newState.newMessageText).toEqual(initialState.newMessageText);
});
