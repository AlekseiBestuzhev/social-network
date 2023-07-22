import { DialogType } from '@/components/Pages/Messages/DialogList/Dialog/Dialog.tsx';
import heisenberg from '@/assets/images/localUsers/heisenberg.jpg';
import meladze from '@/assets/images/localUsers/meladze.jpg';
import badman from '@/assets/images/localUsers/bad-man.jpg';
import shelby from '@/assets/images/localUsers/shelby.jpg';
import { v1 } from 'uuid';

// _____ types

export type MessagesActionsType =
	| ReturnType<typeof updateMessageTextAC>
	| ReturnType<typeof setCurrentDialog>
	| ReturnType<typeof addMessageAC>

export type MessageType = {
	id: string,
	text: string,
	userID: string,
	userName: string,
	avatar: string | null,
	time: string,
	date: string,
}

export type MessagesDataType = {
	[key: string]: MessageType[]
}

export type MessagesPageType = {
	dialogsData: DialogType[],
	messagesData: MessagesDataType,
	newMessageText: string,
	currentDialog: string
}

// _____ reducer

const initialState: MessagesPageType = {
	dialogsData: [
		{ id: 'local_meladze', name: 'В. Меладзе', avatar: meladze },
		{ id: 'local_the-badman', name: 'The Badman', avatar: badman },
		{ id: 'local_heisenberg', name: 'Heisenberg', avatar: heisenberg },
		{ id: 'local_user-987454', name: 'user 987454', avatar: null },
		{ id: 'local_t-shelby', name: 'T. Shelby', avatar: shelby }
	],
	messagesData: {
		'local_meladze': [
			{ id: v1(), text: 'Но я тысячу раз обрывал провода', userID: 'local_meladze', userName: 'В. Меладзе', avatar: meladze, time: '20:53', date: '15 Jun 2023' },
			{ id: v1(), text: 'Сам себе кричал: «Ухожу навсегда»', userID: 'local_meladze', userName: 'В. Меладзе', avatar: meladze, time: '20:53', date: '15 Jun 2023' },
			{ id: v1(), text: 'Непонятно, как доживал до утра', userID: 'local_meladze', userName: 'В. Меладзе', avatar: meladze, time: '20:54', date: '15 Jun 2023' },
			{ id: v1(), text: 'Салют...', userID: 'local_meladze', userName: 'В. Меладзе', avatar: meladze, time: '20:54', date: '15 Jun 2023' }
		],
		'local_the-badman': [
			{ id: v1(), text: 'ХАРВИ ДЭНТ', userID: 'local_the-badman', userName: 'The Badman', avatar: meladze, time: '20:53', date: '11 May 2023' },
			{ id: v1(), text: 'Что?', userID: 'authUser', userName: 'authUser', avatar: null, time: '20:53', date: '11 May 2023' },
			{ id: v1(), text: 'Можем ли мы доверять ему?', userID: 'local_the-badman', userName: 'The Badman', avatar: meladze, time: '20:54', date: '11 May 2023' }
		],
		'local_heisenberg': [
			{ id: v1(), text: 'Say my name', userID: 'local_heisenberg', userName: 'Heisenberg', avatar: heisenberg, time: '05:32', date: '17 Mar 2023' }
		],
		'local_user-987454': [],
		'local_t-shelby': []
	},
	newMessageText: '',
	currentDialog: ''
}

export const MessagesReducer = (state: MessagesPageType = initialState, action: MessagesActionsType): MessagesPageType => {
	switch (action.type) {
		case 'UPDATE-MESSAGE-TEXT': {
			return {
				...state,
				newMessageText: action.changedMessageText
			};
		}
		case 'ADD-MESSAGE': {
			const newMessage: MessageType = {
				id: v1(),
				text: state.newMessageText,
				userID: action.payload.userID,
				userName: action.payload.name,
				avatar: action.payload.photo,
				time: action.payload.time,
				date: action.payload.date,
			}
			return {
				...state,
				newMessageText: '',
				messagesData: {
					...state.messagesData,
					[state.currentDialog]: [...state.messagesData[state.currentDialog], newMessage]
				}
			}
		}
		case 'SET-CURRENT-DIALOG': {
			return {
				...state,
				currentDialog: action.payload.userID
			}
		}
		default:
			return state;
	}
}

// _____ actions

export const updateMessageTextAC = (newText: string) => ({
		type: 'UPDATE-MESSAGE-TEXT',
		changedMessageText: newText
	} as const);

export const addMessageAC = (userID: string, name: string, photo: string | null) => {
	const formatter = new Intl.DateTimeFormat("ru", {
		hour: "numeric",
		minute: "numeric"
	});
	const time = `${formatter.format(new Date())}`
	const dateFormatter = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
	const date = `${dateFormatter.format(new Date())}`;
	return {
		type: 'ADD-MESSAGE',
		payload: {
			time,
			date,
			userID,
			name,
			photo
		}
	} as const;
}

export const setCurrentDialog = (userID: string) => ({
		type: 'SET-CURRENT-DIALOG',
		payload: {
			userID
		}
	} as const);