import cls from '@/components/pages/Messages/DialogList/DialogList.module.scss'
import { MessagesPageType } from '@/features/messages/messages-reducer';
import { Dialog } from '@/pages/Messages/DialogList/Dialog/Dialog';
import { LastMessageType } from '@/pages/Messages/Messages';
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