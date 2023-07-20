import cls from '@/components/Pages/Messages/DialogList/DialogList.module.scss'
import { Dialog } from '@/components/Pages/Messages/DialogList/Dialog/Dialog';
import { LastMessageType } from '@/components/Pages/Messages/Messages';
import { MessagesPageType } from '@/redux/messages/messages-reducer';
import { FC } from 'react';

type DialogListPropsType = Pick<MessagesPageType, 'dialogsData'> & {
	lastMessages: LastMessageType[]
};

export const DialogList: FC<DialogListPropsType> = ({ dialogsData, lastMessages }) => {

	const dialogsList: JSX.Element | JSX.Element[] =
		dialogsData.length
			? dialogsData.map(el => {
				const lm = lastMessages.find(m => m.userID === el.id)
				const lastText = lm?.text || '';
				const lastDate = lm?.date || '';
				return (
					<Dialog
						key={el.id}
						id={el.id}
						name={el.name}
						avatar={el.avatar}
						lastMessage={lastText}
						lastDate={lastDate}
					/>)
			})
			: <span className={cls.emptyList}>Nobody needs you...</span>

	return (
		<ul className={cls.dialogItems}>
			{dialogsList}
		</ul>
	);
}