import { CurrentDialog } from '@/pages/Messages/CurrentDialog/CurrentDialog';
import {DialogType, MessageType} from '@/features/messages/messages-reducer';
import { DialogList } from '@/pages/Messages/DialogList/DialogList';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import cls from '@/pages/Messages/Messages.module.scss';
import picture from '@/assets/images/messages.gif';
import { FC, memo } from 'react';

export type LastMessageType = {
	userID: string,
	text: string,
	date: string
};

type MessagesPropsType = {
	dialogsData: DialogType[],
	lastMessages: LastMessageType[],
	currentUserID: string,
	currentUserName: string,
	currentMessages: MessageType[]
}

export const Messages: FC<MessagesPropsType> = memo(({
	dialogsData,
	lastMessages,
	currentUserID,
	currentUserName,
	currentMessages }) => {

	return (
		<div className={cls.page}>
			<div className={cls.leftColumn}>
				<h2 className={cls.title}>Dialogs</h2>
				<DialogList dialogsData={dialogsData} lastMessages={lastMessages} />
			</div>
			{
				currentUserID
					? <CurrentDialog userID={currentUserID} messagesData={currentMessages} name={currentUserName} />
					: <SectionInfo text='Choose the dialog...' picture={picture} size='16rem' />
			}
		</div>
	);
})