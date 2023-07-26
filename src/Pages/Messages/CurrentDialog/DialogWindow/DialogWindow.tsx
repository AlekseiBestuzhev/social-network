import cls from '@/components/Pages/Messages/CurrentDialog/DialogWindow/DialogWindow.module.scss';
import { CurrentDialogPropsType } from '@/components/Pages/Messages/CurrentDialog//CurrentDialog';
import { Message } from '@/components/Pages/Messages/CurrentDialog/DialogWindow/Message/Message';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import picture from '@/assets/images/dialog.gif';
import { FC, useEffect, useRef } from 'react';

type DialogWindowPropsType = Omit<CurrentDialogPropsType, 'name'>

export const DialogWindow: FC<DialogWindowPropsType> = ({ messagesData, userID }) => {

	const dialogMessagesList: JSX.Element | JSX.Element[] =
		messagesData.length
			? messagesData.map(el => (
				<Message
					key={el.id}
					id={el.id}
					text={el.text}
					userID={el.userID}
					userName={el.userName}
					avatar={el.avatar}
					time={el.time}
					date={el.date}
					currentDialog={userID}
				/>))
			: <SectionInfo text='Write a message to start chatting...' picture={picture} />

	const messagesEndRef = useRef<null | HTMLDivElement>(null)
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}
	useEffect(() => {
		scrollToBottom()
	}, [messagesData]);

	return (
		<div className={cls.dialogMessages}>
			{dialogMessagesList}
			<div ref={messagesEndRef}></div>
		</div>
	);
}