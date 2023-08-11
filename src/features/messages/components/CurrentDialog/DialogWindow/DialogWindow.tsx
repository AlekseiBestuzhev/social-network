import {Message} from "@/features/messages/components/CurrentDialog/DialogWindow/Message/Message.tsx";
import cls from '@/features/messages/components/CurrentDialog/DialogWindow/DialogWindow.module.scss';
import {messagesDataSelector} from "@/features/messages/selectors/messagesDataSelector";
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import {FC, memo, useEffect, useRef} from 'react';
import picture from '@/assets/images/dialog.gif';
import {useAppSelector} from "@/app/hooks.ts";

type DialogWindowPropsType = {
	userID: string
}

export const DialogWindow: FC<DialogWindowPropsType> = memo(({ userID }) => {

	const messagesEndRef = useRef<null | HTMLDivElement>(null);

	const messagesData = useAppSelector(messagesDataSelector)[userID];

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messagesData]);


	const dialogMessagesList = messagesData.length
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
					iSender={userID !== el.userID}
				/>))
			: <SectionInfo text='Write a message to start chatting...' picture={picture} />

	return (
		<div className={cls.dialogMessages}>
			{dialogMessagesList}
			<div ref={messagesEndRef}></div>
		</div>
	)
})