import cls from '@/components/Pages/Messages/CurrentDialog/DialogWindow/Message/Message.module.scss';
import { MessageType } from '@/features/messages/messages-reducer';
import { FC } from 'react';

type MessagePropsType = MessageType & {
	currentDialog: string
}

export const Message: FC<MessagePropsType> = ({ text, userID, currentDialog, time }) => {

	const messageClasses = `${cls.wrapper} ${currentDialog !== userID && cls.iSender}`;

	return (
		<div className={messageClasses}>
			<div className={cls.message}>{text}</div>
			<p className={cls.time}>{time}</p>
		</div>
	);
}